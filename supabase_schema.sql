-- Create registries table
CREATE TABLE registries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  baby_name TEXT NOT NULL,
  due_date DATE NOT NULL,
  welcome_message TEXT,
  shipping_address TEXT,
  contact_details TEXT,
  how_to_use TEXT,
  upi_id TEXT,
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
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration: if adding to existing table run:
-- ALTER TABLE registries ADD COLUMN how_to_use TEXT;
-- ALTER TABLE registries ADD COLUMN upi_id TEXT;

-- Enable Row Level Security
ALTER TABLE registries ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Policies for registries
CREATE POLICY "Allow public read access to registries" ON registries
  FOR SELECT USING (true);

-- Policies for gifts
CREATE POLICY "Allow public read access to gifts" ON gifts
  FOR SELECT USING (true);

CREATE POLICY "Allow public update access to gifts" ON gifts
  FOR UPDATE USING (true) WITH CHECK (true);

-- Function to handle blessings (append to JSONB array)
CREATE OR REPLACE FUNCTION append_blessing(gift_id UUID, person_name TEXT)
RETURNS void AS $$
BEGIN
  UPDATE gifts
  SET gifted_by = COALESCE(gifted_by, '[]'::jsonb) || jsonb_build_array(person_name)
  WHERE id = gift_id AND is_blessing = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
