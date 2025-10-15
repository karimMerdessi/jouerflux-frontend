# JouerfluxFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

# Project Setup

Prerequisites

Ensure you have the following installed:

Node.js (>= 20.x recommended)

npm (>= 10.x recommended)

Angular CLI (>= 20.x)

# Installation

Clone the repository and install dependencies:

git clone https://github.com/karimMerdessi/jouerflux-frontend.git
cd jouerflux-frontend
npm install

# Running the Application

Start the development server:

ng serve


Navigate to http://localhost:4200/ in your browser to view the application.

# Running Tests

Run the specific unit test i wrote : 

 ng test --include src/app/services/firewall.service.spec.ts

 # Assumptions & Design Choices

 -Angular 20 is utilized with standalone components for modularity.
 -Reactive Forms are employed for form handling (FirewallForm).
 -HttpClient is used for API interactions via FirewallService.
 -API endpoints are assumed to be at http://localhost/firewalls
 -Basic routing is implemented using Angular Router.
 -Forms include validation and error handling.
 -Unit tests are written using Jasmine/Karma with mocked HTTP requests.

 # Features

-Pagination is implemented across the three modules: Firewalls, Policies, and Rules.

-Search functionality by name is available on the Firewalls screen.

-A navbar is included to navigate between the modules: Firewalls, Policies, and Rules.

-Update forms are not implemented, as the backend does not provide a PUT method.

# Project Structure

PROJECT_ROOT
├─ src
│   ├─ index.html
│   ├─ main.ts
│   ├─ styles.scss
│   └─ app
│       ├─ app.config.ts
│       ├─ app.html
│       ├─ app.routes.ts
│       ├─ app.scss
│       ├─ app.spec.ts
│       └─ app.ts
│       ├─ firewalls
│       │   ├─ firewall-detail
│       │   │   ├─ firewall-detail.html
│       │   │   ├─ firewall-detail.scss
│       │   │   ├─ firewall-detail.spec.ts
│       │   │   └─ firewall-detail.ts
│       │   ├─ firewall-form
│       │   │   ├─ firewall-form.html
│       │   │   ├─ firewall-form.scss
│       │   │   ├─ firewall-form.spec.ts
│       │   │   └─ firewall-form.ts
│       │   └─ firewall-list
│       │       ├─ firewall-list.html
│       │       ├─ firewall-list.scss
│       │       ├─ firewall-list.spec.ts
│       │       └─ firewall-list.ts
│       ├─ models
│       │   ├─ firewall.model.ts
│       │   ├─ policy.model.ts
│       │   └─ rule.model.ts
│       ├─ navbar
│       │   └─ navbar
│       │       ├─ navbar.html
│       │       ├─ navbar.scss
│       │       ├─ navbar.spec.ts
│       │       └─ navbar.ts
│       ├─ policies
│       │   ├─ policies-form
│       │   │   ├─ policies-form.html
│       │   │   ├─ policies-form.scss
│       │   │   ├─ policies-form.spec.ts
│       │   │   └─ policies-form.ts
│       │   └─ policies-list
│       │       ├─ policies-list.html
│       │       ├─ policies-list.scss
│       │       ├─ policies-list.spec.ts
│       │       └─ policies-list.ts
│       ├─ rules
│       │   ├─ rules-form
│       │   │   ├─ rules-form.html
│       │   │   ├─ rules-form.scss
│       │   │   ├─ rules-form.spec.ts
│       │   │   └─ rules-form.ts
│       │   └─ rules-list
│       │       ├─ rules-list.html
│       │       ├─ rules-list.scss
│       │       ├─ rules-list.spec.ts
│       │       └─ rules-list.ts
│       └─ services
│           ├─ firewall.service.spec.ts
│           ├─ firewall.service.ts
│           ├─ policy.service.ts
│           └─ rules.service.ts
├─ assets
├─ styles.scss
├─ angular.json
├─ package.json
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.spec.json
└─ README.md

# Explanation of the project tree

The project is divided into three main modules: firewalls, policies, and rules.

Each module contains components (*-form, *-list, *-detail) that handle specific functionalities like creating, listing, or deleting entities.

This modular structure helps keep related features together and makes the project easier to maintain.

The models folder contains TypeScript models representing the main data structures.

The services folder provides business logic and API communication for each module.

navbar contains the navigation component shared across the app.

Top-level files like angular.json, package.json, and tsconfig.json are configuration files for the Angular project.

The assets folder stores static resources like images or fonts.

styles.scss holds global styles applied across the project.
