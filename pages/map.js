import Map from '@components/Map';
import CordProvider from '@providers/CordProvider';

const mapPage = () => {
  return (
    <CordProvider>
      <div style={{ height: '100vh', width: '100%', border: '1px solid red' }}>
        <Map height="100%" width="100%" />
      </div>
    </CordProvider>
  );
};
export default mapPage;
