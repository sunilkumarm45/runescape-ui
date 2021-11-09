# runescape-ui
Run Escape LeaderBoard Angular Code

Landing Screen
--------------
![image](https://user-images.githubusercontent.com/48672046/140803238-544deb3c-b163-457d-bcdf-6256e4ec22bb.png)

Category Selection
------------------
![image](https://user-images.githubusercontent.com/48672046/140803368-6e557f0d-a2df-4d8a-8c2d-14a7dd89aa99.png)

Search by player name
---------------------
![image](https://user-images.githubusercontent.com/48672046/140803484-3f74d2fa-8c82-47f5-ba25-ab2e2743ff3a.png)

# LeaderboardFrontendAngular

To get this project running, do an npm install, and npm start.

The project should run perfectly without performing any further steps.

It currently runs off of the backend system, if you want to run this off of a local backend, change the proxy.conf.json as such:

# Current file.
{
	"/api/*": {
		"target": "http://localhost:8080/",
		"secure": false,
		"logLevel": "debug",
		"changeOrigin": true
	}
}
