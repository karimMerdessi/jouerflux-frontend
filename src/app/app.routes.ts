import { Routes } from '@angular/router';
import { FirewallList } from './firewalls/firewall-list/firewall-list';
import { FirewallDetail } from './firewalls/firewall-detail/firewall-detail';
import { FirewallForm } from './firewalls/firewall-form/firewall-form';
import { PoliciesList } from './policies/policies-list/policies-list';
import { PoliciesForm } from './policies/policies-form/policies-form';
import { RulesList } from './rules/rules-list/rules-list';
import { RulesForm } from './rules/rules-form/rules-form';

export const routes: Routes = [
    { path: '', redirectTo: '/firewalls', pathMatch: 'full' },
    { path: 'firewalls', component: FirewallList },
    { path: 'firewalls/create', component: FirewallForm },
    { path: 'firewalls/:id', component: FirewallDetail },
    { path: 'policies', component: PoliciesList },
    { path: 'policies/create', component: PoliciesForm },
    { path: 'rules', component: RulesList },
    { path: 'rules/create', component: RulesForm },
];
