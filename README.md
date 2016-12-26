# Node Controlling WebApp

Based on the popular [MEAN.JS](http://meanjs.org) Stack.

This is mean to be a hub and interface for configuring a genral use Home Automation system.
It works along side my other co-project [Home Nodes](https://github.com/tloftis/outlet_node) to allow control of any hardware able to be pluged into a raspberry pi with any other hardware or sofware interface.

The system allows for the use of structure javascript "drivers" to interface with hardware or sofware on the PI. The use of "links" allows for any input to dynamically be connected to any output, any amout of PIs can be connected allowing for a distributed system.

## Inputs and Outputs

The system comes down to directing an Input to an Output.

### Input
A input is any way of generating capturable data, a physical button can be connected to the PI and be used as an interface. A RFID sensor could be conected as well, even things like speech to text can also be used with the system or just the tempature of the board.

Inputs will currently genrate one of Three types of data Strings, Numbers, and Booleans. When the input genrates new data, it will send a HTTP POST request off to the primary server with the input's ID and the value it just generated. From there if the server has a link tied to the input it will pipe the value the input sent over to the Output.

Inputs are communicated with through the use of Drivers, a driver uses a generic construtor and configuration file. This driver can speak with physical hardware or sofware and allows for anything that can be done with Node to be able to done by an input, as long as the final value genrated by Input is one of the previously listed data Types.

Inputs hardware is hooked up physically but is configured through the web interface, things like the Driver configuration are set here. Things like what pin it is connected to or it's inital value can be set, as well as a plain text name, description and location field can be set to make the Input stand out a bit better.

### Output
A Output takes in data and typically peforms some action based on what the data was. A Output can be things like a physical Relay to switch a light or fan on or off, or something like a eletronic lock to temporarly unlock a door. Things like Text to Speech can also be done or things like underclock the machine it is running on to cool it off if it is over heating.

Outputs currently take in one of Three types of data Strings, Numbers, and Booleans. A Output currently recieves a value through a POST request and responds with either a message explaining any issues or a confirmation of it's success. Values can be sent to the Output by hand through the user interface on the main servers web interface. Inputs can also be piped into any Output if the type of data prodcued by an output matches the type of data the Output takes in. In the future Pipes will be implemented to convert input data on the fly to other formats.

Outputs are communicated with through the use of Drivers, a driver uses a generic construtor and configuration file. This driver can speak with physical hardware or sofware and allows for anything that can be done with Node to be able to done by any Output, as long as the final value genrated by Output is one of the previously listed data Types.

Outputs hardware is hooked up physically but is configured through the web interface, things like the Driver configuration are set here. Things like what pin it is connected to or it's inital value can be set, as well as a plain text name, description and location field can be set to make the Output stand out a bit better.

## Drivers
Drivers are modular peciese of code with a uniform final Interaction level, but can have very diverse internal code structures and functions. They provide the interface for inputs and outputs to interact with the outside world or react to it. There are two primary types of drivers, input drivers and output drivers. Input drivers generate data while Output Drivers take in data and act apon it.

Drivers can be hotswapped and added and removed, they are currently automatically found on system startup and a list of them is provided the the primary server for viewing but view only, no CRUD operations are able to be done by the server. A driver is setup to a input/output on the web interface, you select which driver will be used from a list of all current drivers for that particular device.

The drivers are stored in the [root]/drivers/(inputs|outputs)/ directorys.

## Links
Links connect any input to any output, the link is many to many as any input or output can have as many links as wanted by the user. One lightswitch input can control 20 Light outputs. Since the inputs and outputs are set throught HTTP POST requests the input and output can be on two seprate Boards, this means if you have a lightswitch connected to the system it can now control any light hooked up to the system or multiple lights reguardless of it's location, or the lightswitch could lock/unlock a door if the door lock is hooked up to the system since any input can control any output if types match up or if a pipe can convert the value.
	
## Pipes
Pipes are not implemented yet, but will be soon.

A pipe takes in a value from an input or another pipe and preforms an operation on the data then can return the data to either another pipe or an output or end that data flow and not return. Pipes will be able to be used to compare the value of a string to know  wheither or not to unlock a door, convert a number into boolean to use a dial to turn a series of lights on based on it's value, and many more applications. 
	
# Setup
Server:

1. Install Node on the system you plan on being the server
2. Install MongoDB on the system as well and make sure it is running after install
2. Clone this Repo
3. Go into the newly created directory and rename the file ".envtemplate" to ".env"
4. Edite the new ".env" file to remove the "#" in front of the MONGO_SEET line
5. Optional: Configure the .env file to your liking, i would suggest changing the NODE_ENV Parameter to "develop" and changing the PORT
6. Open a terminal window in the directory and run the command "npm install" and let it run, you sould run the command a second time after the first completes just to make sure, sometimes it happens.
7. Now in the same terminal run "node server.js" and if all is good it should say the server is up and give you a block of green text showing the server information
8. Go to the url http://localhost:2000 (or what ever port you specified, this number can be seen in the Server param of the green text)
9. You should see the site, the log in information can be found in the terminal window, it should be in red text, two users, an admin and a user account.
10. if you have a Home Node already running, then after login you should be able to see it in the "Node List" that you can see from the dropdown Nodes list at the top of the screen.

Home Node:

	Note: the software is ment to run on a raspberry pi, but technically if you make the driver for a diffrent system it should run just fine. You will most likely have to remove the wiring-pi library from the package.json, but I have heard that it is ported to some systems other than the PI now.

1. Install Node on the system you plan on being the Home Node
2. Clone this repo to the system
3. Go into the newly created directory and open a terminal window in it
4. Run the command "npm install" and let it run, it may take a moment to compile wiring-pi, and may even fail if you don't have all the depencies to compile it
5. if all went well, in the terminal run "node app.js" and it should startup.

# Future ToDo
	Add in pipes, then create the pipe software
	
	Create new Drivers
		IR Light Input and output driver would be cool
		RFID Input driver would also be nice
		Driver for a Encoder would be cool, but low priority
		Driver for a Speech to Text input and a Text to Speech output
		Driver for controlling KODI media server throught it's web interface
		
