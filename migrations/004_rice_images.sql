-- Replace placeholder/blank photos for the six rice dishes with user-provided image URLs.
UPDATE menu_items SET image_url='https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=122293740944206657', updated_at=NOW() WHERE name='Basmati White Rice';
UPDATE menu_items SET image_url='https://kikifoodies.com/wp-content/uploads/2024/11/ET5B7665-7.jpg', updated_at=NOW() WHERE name='Chinese Rice';
UPDATE menu_items SET image_url='https://cheflolaskitchen.com/wp-content/uploads/2015/10/Coconut-Rice-6-1-scaled.jpg', updated_at=NOW() WHERE name='Coconut Rice';
UPDATE menu_items SET image_url='https://kikifoodies.com/wp-content/uploads/2024/11/ET5B7665-7.jpg', updated_at=NOW() WHERE name='Fried Rice';
UPDATE menu_items SET image_url='https://kikifoodies.com/wp-content/uploads/2025/03/ET5B8958-4.jpeg', updated_at=NOW() WHERE name='Goat Meat Jollof Rice';
UPDATE menu_items SET image_url='https://upload.wikimedia.org/wikipedia/commons/0/0a/Jollof_Rice_with_Stew.jpg', updated_at=NOW() WHERE name='Jollof Rice';
