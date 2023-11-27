/** @TODO */
export async function POST(request: Request) {
    return request
      .json()
      .then((body) => {
        if (body.token === "123") {
          return new Response(JSON.stringify({ name:"Jarrad", email:"Jarrad@connexin.co.uk" }), { status: 200 });
        }
        return new Response("Unauthorized", { status: 401 });
      })
      .catch(() => new Response("Bad Request", { status: 400 }));
  }
  
