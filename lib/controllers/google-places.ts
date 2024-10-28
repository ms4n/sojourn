import { PlaceDetails, PlacePrediction } from '@/types/google-places';

export async function getPlacePredictions(
  input: string
): Promise<PlacePrediction[]> {
  if (!input.trim()) return [];

  try {
    const response = await fetch('/api/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return (
      data.suggestions
        ?.filter((suggestion: any) => suggestion.placePrediction)
        ?.map((suggestion: any) => {
          const { placePrediction } = suggestion;
          return {
            place_id: placePrediction.placeId,
            description: placePrediction.text.text,
            structured_formatting: {
              main_text: placePrediction.text.text.split(',')[0],
              secondary_text: placePrediction.text.text
                .split(',')
                .slice(1)
                .join(',')
                .trim(),
            },
          };
        }) || []
    );
  } catch (error) {
    console.error('Error fetching place predictions:', error);
    return [];
  }
}

export async function getPlaceDetails(
  placeId: string
): Promise<PlaceDetails | null> {
  try {
    const response = await fetch(`/api/places?placeId=${placeId}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    return {
      place_id: data.id,
      name: data.displayName.text,
      formatted_address: data.formattedAddress,
      geometry: {
        location: {
          lat: data.location.latitude,
          lng: data.location.longitude,
        },
      },
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}
