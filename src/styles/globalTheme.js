export const globalGrommetTheme = {
    "name": "my theme",
    "rounding": 0,
    "spacing": 20,
    "defaultMode": "light",
    "global": {
        "colors": {
            "brand": {
                "dark": "#7700cc",
                "light": "#6600cc"
            },
            "background": {
                "dark": "#111111",
                "light": "#EEEEEE"
            },
            "background-back": {
                "dark": "#000000",
                "light": "#DDDDDD"
            },
            "background-front": {
                "dark": "#222222",
                "light": "#FFFFFF"
            },
            "background-contrast": {
                "dark": "#FFFFFF11",
                "light": "#11111111"
            },
            "text": {
                "dark": "#EEEEEE",
                "light": "#333333"
            },
            "text-strong": {
                "dark": "#FFFFFF",
                "light": "#000000"
            },
            "text-weak": {
                "dark": "#CCCCCC",
                "light": "#444444"
            },
            "text-xweak": {
                "dark": "#999999",
                "light": "#666666"
            },
            "border": {
                "dark": "#444444",
                "light": "#CCCCCC"
            },
            "control": "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning",
            "focus": {
                "light": "#000000",
                "dark": "#34DD33"
            }
        },
        "font": {
            "family": "Arial",
            "size": "15px",
            "height": "20px",
            "maxWidth": "300px"
        },
        "active": {
            "background": "active-background",
            "color": "active-text"
        },
        "hover": {
            "background": "active-background",
            "color": "active-text"
        },
        "selected": {
            "background": "selected-background",
            "color": "selected-text"
        },
        "control": {
            "border": {
                "radius": "0px"
            }
        },
        "drop": {
            "border": {
                "radius": "0px"
            }
        },
        "borderSize": {
            "xsmall": "1px",
            "small": "2px",
            "medium": "3px",
            "large": "10px",
            "xlarge": "20px"
        },
        "breakpoints": {
            "small": {
                "value": 640,
                "borderSize": {
                    "xsmall": "1px",
                    "small": "2px",
                    "medium": "3px",
                    "large": "5px",
                    "xlarge": "10px"
                },
                "edgeSize": {
                    "none": "0px",
                    "hair": "1px",
                    "xxsmall": "2px",
                    "xsmall": "3px",
                    "small": "5px",
                    "medium": "10px",
                    "large": "20px",
                    "xlarge": "40px"
                },
                "size": {
                    "xxsmall": "20px",
                    "xsmall": "40px",
                    "small": "80px",
                    "medium": "160px",
                    "large": "320px",
                    "xlarge": "640px",
                    "full": "100%"
                }
            },
            "medium": {
                "value": 1280
            },
            "large": {}
        },
        "edgeSize": {
            "none": "0px",
            "hair": "1px",
            "xxsmall": "3px",
            "xsmall": "5px",
            "small": "10px",
            "medium": "20px",
            "large": "40px",
            "xlarge": "80px",
            "responsiveBreakpoint": "small"
        },
        "input": {
            "padding": "10px",
            "weight": 600
        },
        "spacing": "20px",
        "size": {
            "xxsmall": "40px",
            "xsmall": "80px",
            "small": "160px",
            "medium-small": "240px",
            "medium": "320px",
            "medium-large": "480px",
            "large": "640px",
            "xlarge": "960px",
            "xxlarge": "1280px",
            "full": "100%"
        }
    },
    "chart": {},
    "diagram": {
      "line": {}
    },
    "meter": {},
    "button": {
      "border": {
        "width": "2px",
        "radius": "15px"
      },
      "padding": {
        "vertical": "3px",
        "horizontal": "18px"
      }
    },
    "checkBox": {
      "check": {
        "radius": "0px"
      },
      "toggle": {
        "radius": "20px",
        "size": "40px"
      },
      "size": "20px"
    },
    "radioButton": {
      "size": "20px"
    },
    "formField": {
      "border": {
        "color": "border",
        "error": {
          "color": {
            "dark": "white",
            "light": "status-critical"
          }
        },
        "position": "inner",
        "side": "bottom",
        "size": "xsmall"
      },
      "content": {
        "pad": "small"
      },
      "disabled": {
        "background": {
          "color": "status-disabled",
          "opacity": "medium"
        }
      },
      "error": {
        "color": "status-critical",
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "help": {
        "color": "dark-3",
        "margin": {
          "start": "small"
        }
      },
      "info": {
        "color": "text-xweak",
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "label": {
        "margin": {
          "vertical": "xsmall",
          "horizontal": "small"
        }
      },
      "margin": {
        "bottom": "small"
      },
      "round": "0px"
    },
    "calendar": {
      "small": {
        "fontSize": "13.666666666666666px",
        "lineHeight": 1.375,
        "daySize": "22.86px"
      },
      "medium": {
        "fontSize": "15px",
        "lineHeight": 1.45,
        "daySize": "45.71px"
      },
      "large": {
        "fontSize": "19px",
        "lineHeight": 1.11,
        "daySize": "91.43px"
      }
    },
    "clock": {
      "analog": {
        "hour": {
          "width": "7px",
          "size": "20px"
        },
        "minute": {
          "width": "3px",
          "size": "10px"
        },
        "second": {
          "width": "3px",
          "size": "8px"
        },
        "size": {
          "small": "60px",
          "medium": "80px",
          "large": "120px",
          "xlarge": "180px",
          "huge": "240px"
        }
      },
      "digital": {
        "text": {
          "xsmall": {
            "size": "12.333333333333332px",
            "height": 1.5
          },
          "small": {
            "size": "13.666666666666666px",
            "height": 1.43
          },
          "medium": {
            "size": "15px",
            "height": 1.375
          },
          "large": {
            "size": "16.333333333333332px",
            "height": 1.167
          },
          "xlarge": {
            "size": "17.666666666666668px",
            "height": 1.1875
          },
          "xxlarge": {
            "size": "20.333333333333336px",
            "height": 1.125
          }
        }
      }
    },
    "heading": {
      "level": {
        "1": {
          "small": {
            "size": "20px",
            "height": "25px",
            "maxWidth": "407px"
          },
          "medium": {
            "size": "26px",
            "height": "31px",
            "maxWidth": "513px"
          },
          "large": {
            "size": "36px",
            "height": "41px",
            "maxWidth": "727px"
          },
          "xlarge": {
            "size": "47px",
            "height": "52px",
            "maxWidth": "940px"
          }
        },
        "2": {
          "small": {
            "size": "19px",
            "height": "24px",
            "maxWidth": "380px"
          },
          "medium": {
            "size": "23px",
            "height": "28px",
            "maxWidth": "460px"
          },
          "large": {
            "size": "27px",
            "height": "32px",
            "maxWidth": "540px"
          },
          "xlarge": {
            "size": "31px",
            "height": "36px",
            "maxWidth": "620px"
          }
        },
        "3": {
          "small": {
            "size": "18px",
            "height": "23px",
            "maxWidth": "353px"
          },
          "medium": {
            "size": "20px",
            "height": "25px",
            "maxWidth": "407px"
          },
          "large": {
            "size": "23px",
            "height": "28px",
            "maxWidth": "460px"
          },
          "xlarge": {
            "size": "26px",
            "height": "31px",
            "maxWidth": "513px"
          }
        },
        "4": {
          "small": {
            "size": "16px",
            "height": "21px",
            "maxWidth": "327px"
          },
          "medium": {
            "size": "18px",
            "height": "23px",
            "maxWidth": "353px"
          },
          "large": {
            "size": "19px",
            "height": "24px",
            "maxWidth": "380px"
          },
          "xlarge": {
            "size": "20px",
            "height": "25px",
            "maxWidth": "407px"
          }
        },
        "5": {
          "small": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "287px"
          },
          "medium": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "287px"
          },
          "large": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "287px"
          },
          "xlarge": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "287px"
          }
        },
        "6": {
          "small": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "273px"
          },
          "medium": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "273px"
          },
          "large": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "273px"
          },
          "xlarge": {
            "size": "14px",
            "height": "19px",
            "maxWidth": "273px"
          }
        }
      }
    },
    "paragraph": {
      "small": {
        "size": "14px",
        "height": "19px",
        "maxWidth": "287px"
      },
      "medium": {
        "size": "15px",
        "height": "20px",
        "maxWidth": "300px"
      },
      "large": {
        "size": "16px",
        "height": "21px",
        "maxWidth": "327px"
      },
      "xlarge": {
        "size": "18px",
        "height": "23px",
        "maxWidth": "353px"
      },
      "xxlarge": {
        "size": "20px",
        "height": "25px",
        "maxWidth": "407px"
      }
    },
    "text": {
      "xsmall": {
        "size": "14px",
        "height": "19px",
        "maxWidth": "273px"
      },
      "small": {
        "size": "14px",
        "height": "19px",
        "maxWidth": "287px"
      },
      "medium": {
        "size": "15px",
        "height": "20px",
        "maxWidth": "300px"
      },
      "large": {
        "size": "16px",
        "height": "21px",
        "maxWidth": "327px"
      },
      "xlarge": {
        "size": "18px",
        "height": "23px",
        "maxWidth": "353px"
      },
      "xxlarge": {
        "size": "20px",
        "height": "25px",
        "maxWidth": "407px"
      }
    },
    "layer": {
      "background": {
        "dark": "#111111",
        "light": "#FFFFFF"
      }
    },
    "scale": 0.4
  }