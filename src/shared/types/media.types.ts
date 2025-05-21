export interface Media {
  post_id: number;
  title: string;
  description: string;
  date?: string;
  image_url: string;
  category?: string;
  content: string;
  isPublished?: boolean;
}
