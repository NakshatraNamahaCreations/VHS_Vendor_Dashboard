import React from "react";
import { Button } from "react-bootstrap";
import "./style/createcampaign.css";

function CreateCampaign() {
  return (
    <div className="mt-5">
      <div class="row-0-1-792">
        <div class="box-0-1-793">
          <div class="boxColor-0-1-58">
            <p class="boxText-0-1-61">User Action Based Campaign</p>
            <div class="lists-0-1-794">
              <span class="list-0-1-59">
                Automate your communication with User Action Based Campaigns
                where you can retarget your users by sending personalized
                communication based on different user action.
              </span>
              <p class="list-0-1-59">
                <span>E.g:-</span>
                <div style={{ marginLeft: "10px" }}>
                  <ul style={{ listStyle: "initial" }}>
                    <li class="list-0-1-59"> User drops from payment page.</li>
                    <li class="list-0-1-59">
                      User drops from course overview.
                    </li>
                  </ul>
                </div>
              </p>
            </div>
          </div>
          <div class="btnContainer-0-1-62">
            <button
              class="button-0-1-118 button-d155-0-1-1113
             buttonFontStyling-0-1-802 primary-0-1-147 primary-d156-0-1-1114"
              onClick={() =>
                window.location.assign(
                  "/campaigns/create/useractioncampaign/channel"
                )
              }
            >
              Create User Action Based Campaign
            </button>
          </div>
        </div>
        <div class="box-0-1-793">
          <div class="boxColor-0-1-58">
            <p class="boxText-0-1-61">One-Time Campaign</p>
            <div class="lists-0-1-794">
              <span class="list-0-1-59">
                Broadcast your communication with One Time Campaigns where you
                can create engaging and personalized campaigns based on a
                targeted group of audience.
              </span>
              <p class="list-0-1-59">
                <span>E.g:-</span>
                <div style={{ marginLeft: "10px" }}>
                  <ul style={{ listStyle: "initial" }}>
                    <li class="list-0-1-59">
                      Promote your new course to all app users
                    </li>
                    <li class="list-0-1-59">
                      Promote an online workshop for users who buy your course
                    </li>
                  </ul>
                </div>
              </p>
            </div>
          </div>
          <div class="btnContainer-0-1-62">
            <button class="button-0-1-118 button-d155-0-1-1113 buttonFontStyling-0-1-802 primary-0-1-147 primary-d156-0-1-1114  ">
              Create One-Time Campaign
            </button>
          </div>
        </div>
      </div>
      <div className="footerNavContainer-0-1-444 footerNavContainer-d0-0-1-457">
        <Button
          className="px-5 py-2"
          variant="outline-info"
          onClick={() => window.location.assign("/campaigns/list")}
        >
          <i class="fa-solid fa-arrow-left-long"></i> &nbsp;Back
        </Button>
      </div>
    </div>
  );
}

export default CreateCampaign;
