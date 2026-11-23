import { db } from 'hatchable';
export const access = 'public';
export const methods = ['GET'];
export default async function(req,res){
 const {rows}=await db.query("SELECT m.id,m.name,m.description,m.price,m.image_url,m.featured,c.name AS category FROM menu_items m LEFT JOIN menu_categories c ON c.id=m.category_id WHERE m.available=TRUE ORDER BY m.featured DESC,c.sort_order,m.name");
 const cats=await db.query("SELECT name FROM menu_categories WHERE active=TRUE ORDER BY sort_order,name");
 res.json({items:rows,categories:cats.rows});
}