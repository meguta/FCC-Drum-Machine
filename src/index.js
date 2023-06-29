import * as React from "react";
import { useState } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
  Text,
  Box,
  Button,
  Flex,
  ChakraProvider,
  SimpleGrid,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark
} from "@chakra-ui/react";

const audioTip = {
  q: "Heater 1",
  w: "Heater 2",
  e: "Heater 3",
  a: "Heater 4",
  s: "Clap",
  d: "Open-HH",
  z: "Kick-n-Hat",
  x: "Kick",
  c: "Closed-HH"
};

function App() {
  const [display, setDisplay] = useState("");
  const [power, setPower] = useState(false);
  const [volume, setVolume] = useState(50);

  function handleSwitchChange() {
    setPower((prevState) => !prevState);
    !power ? setDisplay("Power On") : setDisplay("Power Off");
  }

  function handleKeyPress(event) {
    const btn = document.getElementById(event.key.toUpperCase());
    console.log("power value " + power);
    try {
      if (power) {
        btn.querySelector("audio").volume = volume / 100;
        btn.querySelector("audio").play();
        setDisplay(audioTip[event.key]);
      }
    } catch (e) {}
  }

  function handleClick(e) {
    if (power) {
      e.target.querySelector("audio").volume = volume / 100;
      e.target.querySelector("audio").play();
      setDisplay(audioTip[e.target.id.toLowerCase()]);
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [power, volume]);
  return (
    <Flex
      height="100vh"
      bg="gray.300"
      justifyContent="center"
      alignItems="center"
      direction="column"
      id="drum-machine"
    >
      <Text fontWeight="extrabold" color="gray.500" fontSize="2xl" pb={4}>
        Drum Machine
      </Text>
      <Flex bg="gray.100" p={5} rounded="md" boxShadow="2xl">
        <SimpleGrid rounded="md" columns={3} spacing={2} p={5}>
          <Button
            height="10"
            id="Q"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            Q
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
          </Button>
          <Button
            height="10"
            id="W"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            W
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
          </Button>
          <Button
            height="10"
            id="E"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            E
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
          </Button>
          <Button
            height="10"
            id="A"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            A
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
          </Button>
          <Button
            height="10"
            id="S"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            S
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
          </Button>
          <Button
            height="10"
            id="D"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            D
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
          </Button>
          <Button
            height="10"
            id="Z"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            Z
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
          </Button>
          <Button
            height="10"
            id="X"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            X
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
          </Button>
          <Button
            height="10"
            id="C"
            colorScheme="blue"
            padding={10}
            onClick={handleClick}
          >
            C
            <audio src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
          </Button>
        </SimpleGrid>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          p={5}
        >
          <Flex direction="column" pb={3}>
            <Text color="gray.500" fontWeight="medium">
              Power
            </Text>
            <Switch onChange={handleSwitchChange} colorScheme="blue" pb={3} />
          </Flex>
          <Flex
            justifyContent="center"
            alignItems="center"
            bg="blue.500"
            width={28}
            height={10}
            rounded="md"
            mb={3}
          >
            <Text id="display" color="blue.100" fontWeight="semibold">
              {display}
            </Text>
          </Flex>
          <Slider
            defaultValue={50}
            value={volume}
            onChange={(e) => {
              setVolume(e);
              setDisplay("Volume " + e);
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Flex>
      </Flex>
    </Flex>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
