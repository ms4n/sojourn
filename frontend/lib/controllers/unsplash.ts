interface UnsplashImage {
  imageUrl: string;
  thumbnailUrl: string;
  altText: string;
  photographer: {
    name: string;
    username: string;
  };
}

interface UnsplashError {
  error: string;
}

export async function getRandomPhoto(query?: string): Promise<UnsplashImage> {
  const searchParams = new URLSearchParams();
  if (query) {
    searchParams.append('query', query);
  }

  const response = await fetch(`/api/unsplash?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData: UnsplashError = await response.json();
    throw new Error(errorData.error || 'Failed to fetch image');
  }

  const data: UnsplashImage = await response.json();
  return data;
}

// Helper function to generate image attribution
export function generateUnsplashAttribution(photographer: UnsplashImage['photographer']): string {
  return `Photo by ${photographer.name} (@${photographer.username}) on Unsplash`;
}

