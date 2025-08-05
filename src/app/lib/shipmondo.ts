"use server";

export async function getPickUpPoints() {
  /* // Fetch the list of available pick-up points from Shipmondo API
  const response = await fetch(
    `${process.env.SHIPMONDO_AUTH_URL}${process.env.SHIPMONDO_API_KEY}/api/public/v3/pickup_points`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pick-up points");
  }

  const data = await response.json();
  return data; */

  const url =
    "https://app.shipmondo.com/api/public/v3/pickup_points?carrier_code=gls&country_code=dk&zipcode=2200";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Basic YjNlY2Y0ODctNzc2Mi00NmI5LWI0MGQtYTY3MWQyMmM0NGE4OmIyZTY0ZTA1LTM1NTMtNDdjYi04ODRhLTk0OTk4MTg1MDBkMw==",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(`List of drop shipping points of:`, data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
