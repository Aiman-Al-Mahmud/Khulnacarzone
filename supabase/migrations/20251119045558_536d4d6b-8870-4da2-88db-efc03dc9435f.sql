-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create cars table
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  maker TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  color TEXT NOT NULL,
  cc TEXT NOT NULL,
  fuel TEXT NOT NULL,
  mileage TEXT NOT NULL,
  grade TEXT NOT NULL,
  chassis TEXT NOT NULL,
  images TEXT[] NOT NULL,
  description TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('new', 'used')),
  category TEXT NOT NULL,
  under_20_lakh BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- RLS policies for cars (public read, admin write)
CREATE POLICY "Anyone can view cars"
  ON public.cars
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert cars"
  ON public.cars
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update cars"
  ON public.cars
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete cars"
  ON public.cars
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  published_date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- RLS policies for blogs (public read, admin write)
CREATE POLICY "Anyone can view blogs"
  ON public.blogs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert blogs"
  ON public.blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blogs"
  ON public.blogs
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blogs"
  ON public.blogs
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create delivered_cars table
CREATE TABLE public.delivered_cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  delivery_date TEXT NOT NULL,
  car_model TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.delivered_cars ENABLE ROW LEVEL SECURITY;

-- RLS policies for delivered_cars (public read, admin write)
CREATE POLICY "Anyone can view delivered cars"
  ON public.delivered_cars
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert delivered cars"
  ON public.delivered_cars
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update delivered cars"
  ON public.delivered_cars
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete delivered cars"
  ON public.delivered_cars
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage buckets for car images, blog images, and videos
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('car-images', 'car-images', true),
  ('blog-images', 'blog-images', true),
  ('delivered-videos', 'delivered-videos', true);

-- Storage policies for car-images
CREATE POLICY "Anyone can view car images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'car-images');

CREATE POLICY "Admins can upload car images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete car images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for blog-images
CREATE POLICY "Anyone can view blog images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

CREATE POLICY "Admins can upload blog images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

-- Storage policies for delivered-videos
CREATE POLICY "Anyone can view delivered videos"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'delivered-videos');

CREATE POLICY "Admins can upload delivered videos"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'delivered-videos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete delivered videos"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'delivered-videos' AND public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER set_updated_at_cars
  BEFORE UPDATE ON public.cars
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_blogs
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_delivered_cars
  BEFORE UPDATE ON public.delivered_cars
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();