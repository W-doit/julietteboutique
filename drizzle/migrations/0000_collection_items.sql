CREATE TABLE public.collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  sort integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collection_items TO anon, authenticated;
GRANT ALL ON public.collection_items TO service_role;
ALTER TABLE public.collection_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view collection" ON public.collection_items FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.collection_items (category, name, subtitle, label, image_url, sort) VALUES
('Vestidos','Vestidos','Movimiento, luz y feminidad','ESPÍRITU ROMÁNTICO','default:dress',1),
('Esenciales','Esenciales','Lo sencillo, extraordinario','CADA DÍA, TÚ','default:knit',2),
('Ocasiones especiales','Ocasiones especiales','Para momentos que se quedan','ELEGANCIA NATURAL','default:occasion',3);