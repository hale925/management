import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  MantineProvider,
  AppShell,
  Text,
  Button,
  Menu,
  Anchor,
} from "@mantine/core";
import { useDispatch } from 'react-redux';
import { fetchPositionsStart, fetchPositionsSuccess, fetchPositionsFailure, } from './positionSlice';
import { getPositions} from './positionApi'

import HumbergerMenu from "react-hamburger-menu";
import PositionTree from "./positionTree";

function LayOut() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchPositionsStart());
      try {
        const data = await getPositions();
        dispatch(fetchPositionsSuccess(data));
      } catch (error) {
        dispatch(fetchPositionsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <MantineProvider>
        <AppShell
          header={{
            height: 60,
          }}
          navbar={{
            width: 300,
            collapsed: isNavbarOpen ? "25%" : "0",
            breakpoint: "md",
          }}
          footer={{ height: 300 }}
        >
          <AppShell.Header className="flex flex-row py-2 bg-green-800 text-white flex justify-between items-center">
            <HumbergerMenu
              menuClicked={toggleNavbar}
              width={20}
              height={20}
              strokeWidth={3}
              rotate={0}
              color="White"
              borderRadius={5}
              className="ml-4 mt-2 mb-2"
            />

            <img
              src="peragoLogo.png"
              alt="Perago logo"
              className="rounded-full h-13 w-20 ml-4 bg-white-700"
            />
            <Text className="text-xl font-bold ml-4 sm:ml-24">
              Perago Information Systems
            </Text>
            <div className="hidden sm:flex ml-24 space-x-4">
              <Button className="text-white hover:text-gray-300">Contact</Button>
              <Button className="text-white hover:text-gray-300">About Us</Button>
              <Button className="text-white hover:text-gray-300">Help</Button>
            </div>
          </AppShell.Header>

          <div className="flex flex-row justify-between">
            {isNavbarOpen && (
              <AppShell.Navbar className="flex flex-col w-300 bg-gray-800 text-white font-bold">
                <Menu>
                  <Anchor
                    className="block py-2 px-10 w-full hover:bg-gray-700"
                    component={Link}
                    to="/"
                  >
                    Home
                  </Anchor>
                  <Anchor
                    className="block py-2 px-10 w-full hover:bg-gray-700"
                    component={Link}
                    to="/positions/new"
                  >
                    Add New Position
                  </Anchor>
                  <Anchor
                    className="block py-2 px-10 w-full hover:bg-gray-700"
                    component={Link}
                    to="/employee/new"
                  >
                    Add New Employee
                  </Anchor>

                  <PositionTree
                    className="block py-2 w-full hover:bg-gray-700"
                  />
                </Menu>
              </AppShell.Navbar>
            )}
            <AppShell.Main
              className={`flex flex-col flex-grow overflow-y-auto px-4 py-6 ${
                isNavbarOpen ? "w-75" : "w-full"
              }`}
            >
              <Outlet />
            </AppShell.Main>
          </div>

          <AppShell.Footer className="flex flex-col items-center justify-between bg-green-800 text-white p-3">
            <div className="flex flex-col py-4 items-center">
              <img
                src="peragoLogo.png"
                alt="Perago logo"
                width={150}
                height={100}
              />
              <br />
              <Text className="ml-2 text-xxl font-bold">
                Perago Information Systems
              </Text>
            </div>
            <div className="flex flex-col py-4 items-center">
              <a href="mailto:info@peragosystems.com">
                Email: info@peragosystems.com
              </a>
              <Text>Tel: +251 114 701 998 | +251 911 231 622</Text>
              <Text>P.O. Box: 139 Addis Ababa, Ethiopia.</Text>
            </div>
          </AppShell.Footer>
        </AppShell>
      </MantineProvider>
    </div>
  );
}

export default LayOut;
