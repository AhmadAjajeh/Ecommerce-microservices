import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketsList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>{ticketsList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;

// getInitialProps is the only locaiton where we can fetch data
// during the server side rendering process

// ============ LEGACY ============
// LandingPage.getInitialProps = async ({ req }) => {
//   // the get initial props requests could be made from the server
//   // and also from the browser depending on the context of loading the page

//   if (typeof window === 'undefined') {
//     // we are on the server
//     // const response
//     const { data } = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user',
//       // servicename.namespace.svc.cluster.local
//       {
//         headers: req.headers,
//         // headers: {
//         //   Host: 'ticketing.dev',
//         //   ...req.headers
//         // },
//       }
//       // should specify the domain for the routing rules in the inginx
//     );
//     return data;
//   } else {
//     // we are on the browser
//     const { data } = await axios.get('/api/users/current-user');
//     return data;
//   }
// };
