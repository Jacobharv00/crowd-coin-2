import React, { Component } from "react";
import { Button, Form, Message } from "semantic-ui-react";

import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

class RequestNew extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    state = {
        value: "",
        description: "",
        recipient: "",
        isLoading: false,
        errorMessage: "",
    };

    onSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isLoading: true, errorMessage: "" });

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        try {
            const accounts = web3.eth.getAccounts();

            // Order matters here for params on createRequest(). Can reference contract method.
            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                )
                .send({ from: accounts[0] });

            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (error) {
            console.log("Error creating new request -->", error);

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
            <Layout>
                <Link
                    route={`/campaigns/${this.props.address}/requests`}
                    legacyBehavior
                >
                    <a>Back</a>
                </Link>
                <h3>Create a Request</h3>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    {/* ===== Description ===== */}
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(e) =>
                                this.setState({ description: e.target.value })
                            }
                        />
                    </Form.Field>

                    {/* ===== Value ===== */}
                    <Form.Field>
                        <label>Amount in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={(e) =>
                                this.setState({ value: e.target.value })
                            }
                        />
                    </Form.Field>

                    {/* ===== Recipient ===== */}
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(e) =>
                                this.setState({ recipient: e.target.value })
                            }
                        />
                    </Form.Field>

                    <Message
                        error
                        header=""
                        content={this.state.errorMessage}
                    />
                    <Button
                        style={{
                            backgroundColor: "purple",
                            color: "white",
                        }}
                        loading={this.state.isLoading}
                    >
                        Create
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
