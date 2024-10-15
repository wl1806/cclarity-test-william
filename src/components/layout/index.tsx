import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { Avatar, Button, Col, Image, Layout, Row, Typography } from "antd";
import css from "./style.module.css";
import { WithRouterProps } from "next/dist/client/with-router";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { connect } from "react-redux";

import IAUthState from "../../interfaces/states/auth";
import { ReduxState } from "../../store/reducers";
import SEO from "../seo";
import LayoutSideMenu from "./layout-side-menu";

const { Content, Sider, Header } = Layout;
const {Text} = Typography
interface IProps extends WithRouterProps {
  children: React.ReactNode;
  className?: string;
  auth: IAUthState;
  isMobile?: boolean;
}

interface SIDE_MENU {
  text: string;
  path: string;
  image: string;
  isActive?: boolean;
}

const sideMenu: SIDE_MENU[] = [
  {
    image: "/images/btn_magic.png",
    path: "/#",
    text: "Magic Write",
    isActive: true,
  },
  {
    image: "/images/btn_post.png",
    path: "/#",
    text: "Post",
  },
  {
    image: "/images/btn_analytic.png",
    path: "/#",
    text: "Analysis",
  },
  {
    image: "/images/btn_idea.png",
    path: "/#",
    text: "Ideas",
  },
  {
    image: "/images/btn_template.png",
    path: "/#",
    text: "Templates",
  },
  {
    image: "/images/btn_scratch.png",
    path: "/#",
    text: "Scratch",
  },
];

const sideMenuBot: SIDE_MENU[] = [
  {
    image: "/images/btn_billing.png",
    path: "/#",
    text: "Billing",
  },
  {
    image: "/images/btn_idea.png",
    path: "/#",
    text: "Payment",
  },
  {
    image: "/images/help.png",
    path: "/#",
    text: "Help",
  },
  {
    image: "/images/btn_time.png",
    path: "/#",
    text: "3d left",
  },
];

interface IState {
  openSidebar: boolean;
}

class LayoutComponent extends React.Component<IProps, IState> {
  static defaultProps: IProps;

  constructor(props: IProps) {
    super(props);
    this.state = {
      openSidebar: false,
    };
  }

  handleClickOutside;

  componentDidMount() {
    const siderComponent = document.getElementById("sider-component");
    const burgerComponent = document.getElementById("burger");
    this.handleClickOutside = (event) => {
      if (
        !siderComponent?.contains(event.target) &&
        !burgerComponent?.contains(event.target)
      ) {
        this.setState({ openSidebar: false });
      }
    };

    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }

  render() {
    const { children, className, isMobile } = this.props;
    return (
      <Layout className={className}>
        <SEO />
        <Header className={`${css.header} ${this.state.openSidebar ? css.blur : ""}`}>
          <Row
            align="middle"
            justify="space-between"
            wrap={false}
            style={{ height: "100%" }}
          >
            <Col>
              <Row className="">
                <Col>
                  {!isMobile ? (
                    <></>
                  ) : (
                    <div onClick={() => this.setState({ openSidebar: true })}>
                      <Image
                        id="burger"
                        className={css.burger}
                        wrapperClassName={css.burgerWrapper}
                        src={"/images/burger.png"}
                        preview={false}
                      />
                    </div>
                  )}
                </Col>
                <Col>
                  <Image
                    wrapperClassName={`${css.logoWrapper}`}
                    className={`${css.logoInner}`}
                    src="/images/logo.png"
                    preview={false}
                  />
                </Col>
                <Col>
                  <Text className={`text-family-open-sans ${css.trialText} ph-1`}>
                    TRIAL
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Avatar size={40} src={this.props.auth.data?.image} />
            </Col>
          </Row>
        </Header>
        <Layout>
          {isMobile ? (
            <>
              <Sider
                id="sider-component"
                className={`${css.siderWrap} ph-1 ${
                  this.state.openSidebar ? css.siderWrapActive : ""
                }`}
              >
                <Col span={24} className={css.siderWrapCol}>
                  <Row>
                    <Col span={24}>
                      {sideMenu.map((e) => {
                        return (
                          <LayoutSideMenu
                            key={e.text}
                            image={e.image}
                            path={e.path}
                            text={e.text}
                            isActive={e.isActive}
                          />
                        );
                      })}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <LayoutSideMenu
                        key={"More"}
                        image={"/images/more.png"}
                        path={"/#"}
                        text={"More"}
                        isActive={false}
                      />
                    </Col>
                  </Row>
                </Col>
              </Sider>
            </>
          ) : (
            <Sider className={`${css.siderWrap} ph-1`}>
              <Col span={24} className={css.siderWrapCol}>
                <Row>
                  <Col span={24}>
                    {sideMenu.map((e) => {
                      return (
                        <LayoutSideMenu
                          key={e.text}
                          image={e.image}
                          path={e.path}
                          text={e.text}
                          isActive={e.isActive}
                        />
                      );
                    })}
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    {sideMenuBot.map((e) => {
                      return (
                        <LayoutSideMenu
                          key={e.text}
                          image={e.image}
                          path={e.path}
                          text={e.text}
                          isActive={e.isActive}
                        />
                      );
                    })}
                  </Col>
                </Row>
              </Col>
            </Sider>
          )}
          <Content className={this.state.openSidebar ? css.blur : ""}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

LayoutComponent.defaultProps = {
  children: undefined,
  auth: {} as IAUthState,
  router: {} as NextRouter,
};

const mapStateToProps = (state: ReduxState) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LayoutComponent));
