# WorkOS

## WorkOS SSO missing parts

It's practically only a Node.js (or Go, etc..) server - there are no limitation that would prevent us from running it. The unsolved thing is configuring the `redirectURI` for each VM.

- Google OAuth (or other) creds
  - Having a Devbook testing acc ready and creds provisioned, later maybe provisioning them for each user or just let the users fill the creds themselves. *We can observe if this is the drop-off point for onboarding and report+react accordingly*.
  - Inject them to VM at start
- WorkOS creds
  - Having a Devbook testing account, later using the user's WorkOS account for creds or creating an account adhoc
  - Inject them to VM at start
- `redirectURI`
  - Needs to be specific per user/VM and injected to the VM
  - **Needs to be configured in the dashboard on a per VM basis**
    - Cannot contain query params or wildcard subdomains

## Run

Install ngrok
```
curl https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz -o ngrok.tar && tar xvzf ngrok.tar
```

SEtup ngrok
```
./ngrok authtoken <ngrok auth token>
```


Run ngrok
```
./ngrok http 3000 --log=stdout > ngrok.log &
```

Get ngrok logs and copy the redirect for the port 3000
```
tail -f ngrok.log
```

Inject the credentials to the VM
```
echo "WORKOS_API_KEY='sk_test_a2V5XzAxRlo4WVpYMkozSjVGRVY5UDJQM0VNMlEzLG84SnN1ZkdsNW1LaUUwTU9jNmdZQ2NLR3c'
WORKOS_CLIENT_ID='client_01FZ8YZX2TZE03FXAJ7R7VP6C2'
WORKOS_CALLBACK='<redirect address from the ngrok logs>'" > .env
```

Start the WorkOS server with the credentials
```
npm run start &
```

Open WorkOS in the ngrok redirect link in the browser