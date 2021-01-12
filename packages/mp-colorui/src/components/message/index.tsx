import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { IProps } from "../../../@types/message";
import ClCard from "../card";
import ClFlex from "../flex";
import ClText from "../text";
import ClIcon from "../icon";

import "./index.scss";
import { classNames } from "../../lib";

let timer;
let firstTimer;
export default function ClMessage(props: IProps) {
  let tempHeight = 500;
  const {
    bgColor = "light-grey",
    type = "info",
    onClose = () => {},
    message = "",
    show = false,
    duration = 3,
  } = props;
  const [showMessage, setShowMessage] = useState(show);
  const [contentHeight, setContentHeight] = useState(tempHeight);
  const [tempMessage, setTempMessage] = useState("");
  const [tempType, setTempType] = useState();
  const durationTime = duration || 3;
  const mapColor = {
    success: "light-green",
    error: "light-red",
    warn: "light-yellow",
    info: "light-grey",
    custom: bgColor,
  };
  const calculateHeight = () => {
    const view = Taro.createSelectorQuery();
    const query = view.select("#cl_message_content");
    return new Promise((resolve) => {
      query.boundingClientRect().exec((res) => {
        const data = res[0];
        resolve(data?.height);
      });
    });
  };
  const clickClose = () => {
    new Promise((resolve) => {
      resolve(calculateHeight());
    }).then((res: number) => {
      const height = res;
      clearTimeout(timer);
      timer = null;
      setContentHeight(height);
      setShowMessage(false);
      onClose && onClose();
    });
  };
  useEffect(() => {
    (function () {
      if (!showMessage) {
        new Promise((resolve) => {
          resolve(calculateHeight());
        }).then((res: number) => {
          const height = res;
          tempHeight = height;
          setContentHeight(tempHeight);
          setShowMessage(false);
        });
      } else {
        tempHeight = 0;
        setTempType(type as any);
        setTempMessage(message || "");
        if (duration !== 0) {
          if (timer) {
            clickClose();
            clearTimeout(timer);
            timer = null;
            return;
          }
          timer = setTimeout(() => {
            clickClose();
            clearTimeout(timer);
            timer = null;
            props.message = "";
          }, durationTime * 1000);
        }
        setContentHeight(tempHeight);
        setShowMessage(true);
      }
    })();
  }, [showMessage]);

  useEffect(() => {
    show && setShowMessage(!!show);
    props.show = false;
  }, [show]);

  useEffect(() => {
    if (show) {
      clearTimeout(timer);
      clearTimeout(firstTimer);
      timer = null;
      clickClose();
      firstTimer = setTimeout(() => {
        setShowMessage(true);
        setTempMessage(message || "");
        setTempType(type as any);
        console.log("tempType====>", props.type);
      }, 300);
    }
  }, [message, show]);

  return (
    <View
      className={classNames("cu-cl-message", props.className)}
      style={Object.assign(
        {
          transition: `all 0.2s linear`,
          top: `${showMessage ? "0" : "-" + contentHeight + "px"}`,
        },
        props.style
      )}
    >
      <View className="cu-cl-message__content" id="cl_message_content">
        <ClCard
          bgColor={mapColor[tempType || 0] || "light-grey"}
          shadow={false}
        >
          <ClFlex justify="between" align="center">
            <ClText text={tempMessage} />
            <View
              onClick={() => {
                clickClose();
              }}
            >
              <ClIcon iconName="close" size="xsmall" />
            </View>
          </ClFlex>
        </ClCard>
      </View>
    </View>
  );
}
