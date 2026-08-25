import {
  Routes
} from '@angular/router';
import {
  Payments as AdminPayments
} from './admin/payments/payments';
import {
  Properties as AdminProperties
} from './admin/properties/properties';
import {
  PropertyForm
} from './admin/property-form/property-form';
import {
  PropertyImages
} from './admin/property-images/property-images';
/* =========================================================
   PUBLIC
========================================================= */

import {
  Home
} from './public/home/home';

import {
  Properties
} from './public/properties/properties';

import {
  PropertyDetail
} from './public/property-detail/property-detail';

import {
  PropertyVisit
} from './public/property-visit/property-visit';

import {
  Projects
} from './public/projects/projects';

import {
  Contact
} from './public/contact/contact';

import {
  Appointment
} from './public/appointment/appointment';


/* =========================================================
   AUTH
========================================================= */

import {
  Login
} from './auth/login/login';

import {
  Register
} from './auth/register/register';


/* =========================================================
   CLIENT
========================================================= */

import {
  Dashboard as ClientDashboard
} from './client/dashboard/dashboard';


/* =========================================================
   AGENT
========================================================= */

import {
  Dashboard as AgentDashboard
} from './agent/dashboard/dashboard';

import {
  Visits as AgentVisits
} from './agent/visits/visits';

import {
  Appointments as AgentAppointments
} from './agent/appointments/appointments';

import {
  Transactions as AgentTransactions
} from './agent/transactions/transactions';


/* =========================================================
   ADMIN
========================================================= */

import {
  Dashboard as AdminDashboard
} from './admin/dashboard/dashboard';

import {
  Users as AdminUsers
} from './admin/users/users';

import {
  Visits as AdminVisits
} from './admin/visits/visits';

import {
  Appointments as AdminAppointments
} from './admin/appointments/appointments';

import {
  Transactions as AdminTransactions
} from './admin/transactions/transactions';


/* =========================================================
   GUARDS
========================================================= */

import {
  authGuard
} from './core/guards/auth.guard';

import {
  roleGuard
} from './core/guards/role.guard';


export const routes: Routes = [


  /* =======================================================
     PUBLIC
  ======================================================= */

  {
    path: '',
    component: Home
  },


  {
    path: 'properties',
    component: Properties
  },


  {
    path: 'properties/:id/visit',
    component: PropertyVisit
  },


  {
    path: 'properties/:id',
    component: PropertyDetail
  },


  {
    path: 'projects',
    component: Projects
  },


  {
    path: 'contact',
    component: Contact
  },


  {
    path: 'appointment',
    component: Appointment
  },


  /* =======================================================
     AUTH
  ======================================================= */

  {
    path: 'login',
    component: Login
  },


  {
    path: 'register',
    component: Register
  },


  /* =======================================================
     CLIENT
  ======================================================= */

  {
    path: 'client',

    component: ClientDashboard,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'CLIENT'
      ]
    }
  },


  /* =======================================================
     AGENT
  ======================================================= */

  {
    path: 'agent',

    component: AgentDashboard,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'AGENT'
      ]
    }
  },


  {
    path: 'agent/visits',

    component: AgentVisits,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'AGENT'
      ]
    }
  },


  {
    path: 'agent/appointments',

    component: AgentAppointments,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'AGENT'
      ]
    }
  },


  {
    path: 'agent/transactions',

    component: AgentTransactions,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'AGENT'
      ]
    }
  },


  /* =======================================================
     ADMIN
  ======================================================= */

  {
    path: 'admin',

    component: AdminDashboard,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    }
  },

  {
    path: 'admin/properties',

    component: AdminProperties,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'admin/properties/new',

    component: PropertyForm,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'admin/payments',

    component: AdminPayments,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    }
  },


  {
    path: 'admin/users',

    component: AdminUsers,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    }
  },


  {
    path: 'admin/visits',

    component: AdminVisits,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    }
  },


  {
    path: 'admin/appointments',

    component: AdminAppointments,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    }
  },


  {
    path: 'admin/transactions',

    component: AdminTransactions,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: [
        'ADMIN'
      ]
    }
  },

  {
    path: 'admin/properties/:id/images',

    component: PropertyImages,

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'admin/properties/new',
    component: PropertyForm
  },
  {
    path: 'admin/properties/:id/edit',
    component: PropertyForm
  },
  /* =======================================================
     FALLBACK
  ======================================================= */

  {
    path: '**',
    redirectTo: ''
  }

];
