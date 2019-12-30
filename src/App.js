import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top'
import MainPage from './pages/main';
import ProductDetails from './pages/produc-details';
import ContactUsPage from './pages/contact-us';
import ProjectsPage from './pages/projects-page';
import WorkAtAccPage from './pages/work-at-acc';
import WhoWeArePage from './pages/who-we-are.page';
import TeamPage from './pages/team.page';
import QualityPage from './pages/quality.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import AdminLoginPage from './pages/admin-login.page';
import AdminAddProjectPage from './pages/admin-add-project.page';
import AdminCityPage from './pages/admin-city.page';
import AdminTeamPage from './pages/admin-team.page';
import AdminCVPage from './pages/admin-cv.page';
import AdminAddTeamPage from './pages/admin-add-team.page';
import adminContactUsPage from './pages/admin-contact-us.page';
import AdminQualityPage from './pages/admin-quality.page';
import AdminWorkWithUsPage from './pages/admin-work-with-us.page';
import AdminWhoWeArePage from './pages/admin-who-we-are.page';
import AdminHomePage from './pages/admin-home.page';
import AdminJobPage from './pages/admin-job.page';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {

  return (
    <Router >
     <ScrollToTop>
        <div className="App bg-light">
          <Switch>
            <Route path="/" exact component={MainPage}></Route>
            <Route exact path="/product-details/:id" component={ProductDetails}></Route>
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/work-at-acc" component={WorkAtAccPage} />
            <Route path="/who-we-are" component={WhoWeArePage} />
            <Route path="/team" component={TeamPage} />
            <Route path="/quality" component={QualityPage} />
            <Route path="/admin/" exact component={AdminLoginPage} />
            <Route path="/admin/dashboard" component={AdminDashboardPage} />
            <Route path="/admin/add-project" component={AdminAddProjectPage} />
            <Route path="/admin/cities" component={AdminCityPage} />
            <Route path="/admin/teams" component={AdminTeamPage} />
            <Route path="/admin/cv" component={AdminCVPage} />
            <Route path="/admin/add-team" component={AdminAddTeamPage} />
            <Route path="/admin/contact-us" component={adminContactUsPage} />
            <Route path="/admin/work-with-us" component={AdminWorkWithUsPage} />
            <Route path="/admin/quality" component={AdminQualityPage} />
            <Route path="/admin/who-we-are" component={AdminWhoWeArePage} />
            <Route path="/admin/home" component={AdminHomePage} />
            <Route path="/admin/jobs" component={AdminJobPage} />
          </Switch>
        </div>
        </ScrollToTop>
    </Router>
  );
}

export default App;
