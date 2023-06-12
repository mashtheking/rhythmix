import { Price } from "@/types";

export const getURL = () => {
  let url;

  if (process.env.NODE_ENV !== 'production') {
    url = 'http://localhost:3000/';
  } else {
    url = 'https://rhythmix-music.vercel.app/'
  }

  return url;
};

export const postData = async (
  {url, data}: {url: string, data?: { price: Price }}
) => {
  console.log('POST REQUEST:', url, data);

  const res: Response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    console.log('ERROR IN POST:', { url, data, res });
    throw new Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (seconds: number) => {
  let time = new Date('1970-01-01T00:30:00Z');
  time.setSeconds(seconds);
  return time;
};