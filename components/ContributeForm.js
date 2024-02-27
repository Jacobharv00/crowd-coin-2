import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
    state = {
        value: "",
        isLoading: false,
        errorMessage: "",
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true, errorMessage: "" });

        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether"),
            });

            // Manually refresh the page
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (error) {
            console.log("Error contributing to the campaign -->", error);

            this.setState({
                errorMessage:
                    error.message ??
                    "Sorry, something went wrong please try again later",
            });
        }

        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={(e) =>
                            this.setState({ value: e.target.value })
                        }
                    />
                </Form.Field>
                <Message error header="" content={this.state.errorMessage} />
                <Button
                    style={{
                        backgroundColor: "purple",
                        color: "white",
                    }}
                    loading={this.state.isLoading}
                >
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
