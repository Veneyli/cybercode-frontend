export interface Course {
  course_id: number;
  title: string;
  small_description: string;
  description?: string;
  technologies?: string;
  level?: string;
  image_url: string;
  video_url?: string | null;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
  progress?: number;
}
