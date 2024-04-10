import Connect from '../components/Connect';
import axios from 'axios';

const fetchKoboData = async () => {
  const token = process.env.TOKEN;
  // console.log(token);
  const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
  const headers = { "Authorization": `Token ${token}` };
  try {
    const response = await axios.get(url, { headers: headers });
    // console.log(response.data);
    return response.data.results;
  } catch (error) {
    if (!error.response)
      console.log(`Error: ${error.message}`);

    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
};

const Home = async () => {
  const results = await fetchKoboData();
  // console.log(results);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16">
      <h1 className='mb-3'>
        Kobo Formular
      </h1>

      <div>
        <ul>
          {results && results.map(result => (
            <li key={result.uid}>{result.name}</li>
          ))}
        </ul>
      </div>

      {/* <Connect token={token} /> */}
    </main>
  )
}

export default Home;