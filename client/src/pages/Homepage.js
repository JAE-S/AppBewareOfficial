// Import React and Redux
// =========================================================
    import React, { Component } from "react";  
    import { connect } from "react-redux";
    import {Redirect} from 'react-router-dom';
// Import Material Ui Components
// =========================================================
    import { Grid } from '@material-ui/core';   
// Import Custom Components
// =========================================================
    import SearchAppAnnie from "../components/SearchAppAnnie"
    import Wrapper from "../components/Wrapper"
    import Nav from "../components/Nav"
    import HeaderContainer from "../components/HeaderContainer"
    import HomepageTabNav from "../components/HomepageTabNav"
    import CategoryCards from "../components/CategoryCards"
    import ShieldLayout from "../components/HomepageShieldLayout"
    import Footer from "../components/Footer";
// Import Redux Components
// =========================================================
    import { categoryActions } from "../Store/Actions/categoryActions";
    import { appActions } from "../Store/Actions/appActions";
    import { shieldActions } from "../Store/Actions/shieldActions";
    import { userActions } from '../Store/Actions/auth';

// Import Media
// =========================================================
    import ABLogo from "../assets/images/AppBeware_icon_shadow.png"
    // import API from "../utils/API.js"
// Import Styles
// =========================================================
    import "../assets/styling/appStyle.css"

     
class Homepage extends Component {

    // Runs Redux to grab all of the categories necessary to render the homepage
    // COMPLETE
    viewCategory = (catId) => {
        this.props.viewSingleCategory(catId)
        this.props.viewSingleCategoryInfo(catId)
    }

    viewApp = (appId) => {
        this.props.viewSingleApp(appId);
        this.props.getFullUserInfo(appId);
        this.props.viewAppReviews(appId);
    }

    // Grabbing all necessary data from Redux
    componentDidMount() {

        // **********************************************
        // THESE FUNCTIONS DO WORK
        // **********************************************

        this.props.viewAllCategories();
        this.props.viewAllShields();
        this.props.getFullUserInfo();
        this.props.viewAppNames();
    }

    render() {

        return (
            <div>
                {this.props.loggedIn ? ( 
                <> 
                    <Nav/>
                    <main>
                        <HeaderContainer> 
                            <div className="headerBanner">
                                <h2 align="center" style={{color: "rgb(255, 255, 255)", borderBottom: "1px solid #13BAC7", margin: 0, padding: "16px"}}> 
                                    Review and track potentially dangerous apps with our rating system:
                                </h2>                          
                            </div>
                            <Wrapper> 
                                <Grid container 
                                    direction="row" 
                                    justify="center" 
                                    alignItems="center"
                                    spacing={1}
                                >
                                <Grid item xs={12}>

                                </Grid>
                                    <Grid item xs={12} sm={3}>
                                    <div>
                                        <img alt="AppBeware herologo" src={ABLogo} style={{ width: "100%", padding: 0}}/>
                                    </div>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={9} style={{  color: "#57585D", display: "flex", flexFlow: "rowWrap", padding: 10,  justifyContent: "space-between"}}>
                                
                                    {!this.props.allShields ? (<p align="center" >Loading...</p>) : 

                                            this.props.allShields.map(shield => (

                                                <ShieldLayout 
                                                    key={shield.id}
                                                    shieldIcon={shield.icon}
                                                    altTxt={shield.altText}
                                                    title={shield.name}
                                                    info={shield.info}
                                                />
                                            ))
                                            }
                                    
                                    </Grid>
                                </Grid>
                            
                            </Wrapper>
                        </HeaderContainer>
        
                        <SearchAppAnnie 
                            viewApp={this.viewApp}
                        />

                        <Wrapper style={{ maxWidth: "1040px", zIndex: "1", position: "static" , top: "calc(100vh - 348px)", left: 0, right: 0, margin: "auto"}}>
                            <HomepageTabNav >
                                <Grid 
                                    container 
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                {!this.props.allCategories ? (<p align="center" >Loading...</p>) : 

                                this.props.allCategories.map(cat => (
                                        <CategoryCards
                                            key={cat.id}
                                            title={cat.name}
                                            catId={cat.id}
                                            imageUrl={cat.imageUrl}
                                            viewCategory={this.viewCategory}
                                        /> 

                                    ))}
                                
                                </Grid>
                            </HomepageTabNav>
                        </Wrapper>
                    </main>
                    <Footer/> 
                 </>
                ) : ( <Redirect to='/' /> )
            } 
            </div>
        )
    }
}


const mapStateToProps = (state) => ({

    allCategories: state.categories.allCategories,
    allShields: state.shields.allShields,
    loggedIn: state.authentication.loggedIn,
    allAppNames: state.apps.allAppNames
});



const actionCreators = {
    getFullUserInfo: userActions.getFullUserInfo,

    viewAppReviews: appActions.viewAppReviews,
    viewAppNames: appActions.viewAppNames,
    viewAllCategories: categoryActions.viewAllCategories,
    viewSingleCategory: categoryActions.viewSingleCategory,
    viewSingleCategoryInfo: categoryActions.viewSingleCategoryInfo,

    viewAllShields: shieldActions.viewAllShields,

     // TODO://////////////////
    // logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(Homepage); 
