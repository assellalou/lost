import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import CordProvider from '@providers/CordProvider';
import Lost from '@components/Lost';
import Found from '@components/Found';

const LostFoundTabs = () => {
  return (
    <CordProvider value={{}}>
      <Tabs variant="soft-rounded" colorScheme="blue" align="center">
        <TabList>
          <Tab>I lost an item</Tab>
          <Tab>I found a lost item</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Lost />
          </TabPanel>
          <TabPanel>
            <Found />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CordProvider>
  );
};
export default LostFoundTabs;
