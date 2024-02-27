import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import { Router } from "../../routes";

import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {
    state = {
        minimumContribution: "",
        errorMessage: "",
        isLoading: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0],
                });

            // Navigate to home page
            Router.pushRoute("/");
        } catch (error) {
            console.log("Error creating campaign -->", error);

            this.setState({
                errorMessage:
                    error.message ??
                    "Sorry, something went wrong please try again later",
                minimumContribution: "",
            });
        }

        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={(event) =>
                                this.setState({
                                    minimumContribution: event.target.value,
                                })
                            }
                        />
                    </Form.Field>
                    <Message
                        error
                        header="Oops!"
                        content={this.state.errorMessage}
                    />
                    <Button
                        loading={this.state.isLoading}
                        content="Create"
                        style={{
                            backgroundColor: "purple",
                            color: "white",
                        }}
                    />
                </Form>
            </Layout>
        );
    }
}
export default CampaignNew;
