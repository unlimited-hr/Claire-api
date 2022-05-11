## API Endpoints

`GET | */iaq/:user_id` <br>

Geeft gemeten luchtkwaliteit van de apparaten gekoppeld aan een gebruiker terug. <br>
In de url geef je een gebruiker-id mee. <br><br>

`GET | */iaq/:user_id/:period` <br>
Geeft gemeten luchtkwaliteit van een gebruiker binnen een periode terug <br>
Hour geeft alles van afgelopen uur terug, Day alles van afgelopen dag. Etc.<br>
Mogelijke waarden: `minute, hour, day, week, month, year`. Je kan ook een getal (in minuten) meegeven. <br><br>

`GET | */iaq/:user_id/predict` <br>
Geeft als string een tip aan de gebruiker terug. Op dit moment nog statisch. <br><br>

`PUT, POST | */devices` <br>
Voegt apparaat toe aan de database. <br>
In de body geef je de omgevingsvariabelen van het apparaat en een apparaat-id (fysieke code) mee. <br>
Je kan zowel een PUT- als een POST request doen. Hiermee kun je ervoor kiezen eerst het apparaat te registreren en later pas de omgevingsvariabelen eraan toe te voegen.<br>
Gebruik bij PUT het url `claireURL/devices/:device-id`. Hierbij is device-id niet de fysieke code maar die in de database. Deze krijg je terug wanneer je het apparaat met POST aanmaakt. <br>
Je krijgt de JSON van het gemaakte of aangepaste object terug.
```json
{ "physical_id": 1, "year_built": 2008, "stories": 2, "cooktop_fuel": "gas", "oven_fuel": "electricity" }
```

`POST | */iaq` <br>
Voegt gemeten luchtkwaliteit toe. <br>
In de body geef je de gemeten waarden en een apparaat-id mee. <br>
```json
{ "device_id": 1, "temperature": 20, "tvoc": 800, "co2": 300, "humidity": 50 }
```

`POST | */connections` <br>
Verbindt een gebruiker en apparaat aan elkaar. <br>
In de body geeft je het gebruiker-id en het apparaat-id mee. Apparaat-id is niet de fysieke code maar het database id.<br>
```json
{ "device_id": 1, "user_id": 1 }
```

`POST | */users` <br>
Maakt een nieuwe gebruiker aan. <br>
In de body geef je een e-mail en een wachtwoord mee. <br>
```json
{ "email": "jane@example.com", "password": "CorrectHorseBatteryStaple" }
```

`DELETE | */users/:user_id` <br>
Verwijdert inloggegevens, id en apparaatverbindingen van een gebruiker. <br>
In de url geef je het id mee van de gebruiker die je wilt vergeten. <br><br>
