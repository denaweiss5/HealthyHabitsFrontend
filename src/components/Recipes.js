import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { Card, Icon, Image } from "semantic-ui-react";
import RecipeCard from "./RecipeCard";
import { viewRecipe } from "../actions/recipes";

class Recipes extends React.Component {
  constructor() {
    super();

    this.state = {
      intervalId: 0,
    };
  }

  handleClick = (id) => {
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "d6d30feb34msh027ba22c7ad5d85p111652jsn5e503987bf98",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((recipeInfo) => {
        this.props.viewRecipe(recipeInfo);
        this.props.history.push("/show_recipe");
      });
  };

  renderCard = (recipe) => {
    const { title, image, id } = recipe;
    return (
      <Card
        onClick={() => this.handleClick(id)}
        style={{
          padding: "10px",
          margin: "50px",
        }}
      >
        <Image
          src={image}
          wrapped
          ui={false}
          style={{
            height: "auto",
            width: "auto",
          }}
        />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
        </Card.Content>
      </Card>
    );
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop = () => {
    let intervalId = setInterval(
      this.scrollStep.bind(this),
      this.props.delayInMs
    );
    this.setState({ intervalId: intervalId });
  }

  render() {
    return (
      <div
        style={{
          paddingLeft: "160px",
          paddingTop: "100px",
        }}
      >
        <Grid>
          <Grid.Row>
            {this.props.recipes.map((recipe) => {
              return this.renderCard(recipe);
            })}
          </Grid.Row>
        </Grid>
        <Button
          style={{
            float: "right",
            marginBottom: "10px",
            marginRight: "10px",
            padding: "20px",
          }}
          icon="angle double up"
          title="Back to top"
          className="scroll"
          onClick={() => {
            this.scrollToTop();
          }}
        ></Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
  };
};

const mapDispatchToProps = {
  viewRecipe: viewRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);