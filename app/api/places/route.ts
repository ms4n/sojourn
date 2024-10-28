import { NextResponse } from 'next/server';

const PLACES_API_BASE = 'https://places.googleapis.com/v1';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Server-side environment variable

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    const requestBody = {
      input,
    };

    const response = await fetch(`${PLACES_API_BASE}/places:autocomplete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY!,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const placeId = searchParams.get('placeId');

    if (!placeId) {
      return NextResponse.json(
        { error: 'Place ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${PLACES_API_BASE}/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key': API_KEY!,
        'X-Goog-FieldMask': 'id,displayName,formattedAddress,location',
      },
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Places API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
