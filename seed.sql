INSERT INTO menu_categories (name, sort_order) VALUES ('Signature plates', 1) ON CONFLICT (name) DO NOTHING;
INSERT INTO menu_categories (name, sort_order) VALUES ('Small chops & starters', 2) ON CONFLICT (name) DO NOTHING;
INSERT INTO menu_categories (name, sort_order) VALUES ('Drinks', 3) ON CONFLICT (name) DO NOTHING;