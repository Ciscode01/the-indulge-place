import { db } from 'hatchable';
export const access = 'public';
export const methods = ['POST'];
export default async function(req,res){
 const b=req.body||{}; const name=String(b.customer_name||'').trim(); const phone=String(b.phone||'').trim(); const fulfillment=b.fulfillment; const items=Array.isArray(b.items)?b.items:[];
 if(name.length<2||name.length>100||!/^[+0-9()\s-]{7,24}$/.test(phone)||!['delivery','pickup'].includes(fulfillment)||!items.length||items.length>30) return res.status(400).json({error:'Please check your details and order items.'});
 const ids=items.map(x=>String(x.id||'')); if(ids.some(x=>! /^[0-9a-f-]{36}$/i.test(x))) return res.status(400).json({error:'Invalid menu item.'});
 const unique=[...new Set(ids)]; const found=await db.query('SELECT id,name,price FROM menu_items WHERE available=TRUE AND id = ANY($1::uuid[])',[unique]);
 if(found.rows.length!==unique.length) return res.status(400).json({error:'One or more items are unavailable.'});
 const map=new Map(found.rows.map(x=>[x.id,x])); let subtotal=0; const lines=[];
 for(const x of items){const row=map.get(String(x.id));const qty=Number(x.quantity);if(!Number.isInteger(qty)||qty<1||qty>50||row.price===null)return res.status(400).json({error:'Invalid quantity or menu price.'});const line=Number(row.price)*qty;subtotal+=line;lines.push({id:row.id,name:row.name,quantity:qty,unit_price:Number(row.price),line_total:line});}
 const address=String(b.address||'').trim().slice(0,500);if(fulfillment==='delivery'&&address.length<5)return res.status(400).json({error:'Please enter a delivery address.'});
 const {rows}=await db.query('INSERT INTO customer_orders (customer_name,phone,email,fulfillment,address,notes,items,subtotal,total) VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9) RETURNING id,created_at',[name,phone,String(b.email||'').slice(0,160),fulfillment,address,String(b.notes||'').slice(0,1000),JSON.stringify(lines),subtotal,subtotal]);
 res.status(201).json({order:rows[0],items:lines,subtotal,total:subtotal});
}