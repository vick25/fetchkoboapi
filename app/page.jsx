import FormSelector from '../components/FormSelector';
import axios from 'axios';

const token = process.env.TOKEN;

const fetchKoboForms = async () => {
  const url = "https://kf.kobotoolbox.org/api/v2/assets.json"; // Replace with your actual kpi URL
  const headers = { "Authorization": `Token ${token}` };
  try {
    const response = await axios.get(url, { headers: headers });
    // console.log(response.data);
    return response.data.results;
  } catch (error) {
    if (!error.response)
      console.error(`Error: ${error.message}`);

    console.error(error.response.data);
    console.error(error.response.status);
    console.error(error.response.headers);
  }
};

const Home = async () => {
  const forms = await fetchKoboForms();
  // console.log(forms);

  return (
    <main className="">
      <h1 className='mb-2'>
        My Kobo Forms
      </h1>

      {/* <div>
        <ul>
          {forms && forms.map(result => (
            <li key={result.uid}>{result.name} | <span style={{ color: 'red' }}>{result.uid}</span></li>
          ))}
        </ul>
      </div> */}

      {forms && <FormSelector token={token} forms={forms} />}
    </main>
  )
}

export default Home;