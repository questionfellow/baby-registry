-- Create registries table
CREATE TABLE registries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_name TEXT NOT NULL,
  due_date DATE NOT NULL,
  welcome_message TEXT,
  shipping_address TEXT,
  contact_details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create gifts table
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registry_id UUID REFERENCES registries(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL CHECK (price >= 0),
  image_url TEXT,
  product_url TEXT,
  is_gifted BOOLEAN NOT NULL DEFAULT FALSE,
  gifted_by JSONB DEFAULT '[]'::jsonb, -- Store list of names for Blessings
  is_blessing BOOLEAN NOT NULL DEFAULT FALSE, -- New field for blessings
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
