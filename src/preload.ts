import lumi from 'lumi-control';

const initLumit = async () => {
  const monitors = await lumi.monitors();
  console.log(monitors);
}

initLumit();