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

```npm run start &```

```curl http://localhost:3000```