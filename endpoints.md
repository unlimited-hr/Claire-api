## API Endpoints

GET op: `claireURL/iaq/:user_id` <br>
Geeft gemeten luchtkwaliteit van de apparaten gekoppeld aan een gebruiker terug. <br>
In de url geef je een gebruiker-id mee. <br><br>

POST op: `claireURL/devices` <br>
Voegt apparaat toe aan de database. <br>
In de body geef je de omgevingsvariabelen van het apparaat en een apparaat-id mee. <br>
Je krijgt de JSON van het gemaakte object terug.
```json
{ "physical_id": 1, "year_built": 2008, "stories": 2, "cooktop_fuel": "gas", "oven_fuel": "electricity" }
```

POST op: `claireURL/iaq` <br>
Voegt gemeten luchtkwaliteit toe. <br>
In de body geef je de gemeten waarden en een apparaat-id mee. <br>
```json
{ "device_id": 1, "temperature": 20, "tvoc": 800, "co2": 300, "humidity": 50 }
```

POST op: `claireURL/connections` <br>
Verbindt een gebruiker en apparaat aan elkaar. <br>
In de body geeft je het gebruiker-id en het apparaat-id mee. <br>
```json
{ "device_id": 1, "user_id": 1 }
```

POST op: `claireURL/users` <br>
Maakt een nieuwe gebruiker aan. <br>
In de body geef je een e-mail en een wachtwoord mee. <br>
```json
{ "email": "jane@example.com", "password": "CorrectHorseBatteryStaple" }
```

DELETE op: `claireURL/users/:user_id` <br>
Verwijdert inloggegevens, id en apparaatverbindingen van een gebruiker. <br>
In de url geef je het id mee van de gebruiker die je wilt vergeten. <br><br>