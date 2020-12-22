import styled, { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primaryText};
    -webkit-font-smoothing: antialiased;
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
  }

  button {
    cursor: pointer;
    border: none;
  }

  h2 {
    color: ${props => props.theme.colors.primaryText};
    font-size: 16px;
    letter-spacing: 0.075em;
    font-weight: normal;
  }

  .ReactTable {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
  }

  .ReactTable .rt-table {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    border-collapse: collapse;
    overflow: auto
  }

  .ReactTable .rt-thead {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    user-select: none;
  }

  .ReactTable .rt-thead.-header {
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
    border-bottom: 1px solid ${props => props.theme.colors.borderLight}
  }

  .ReactTable .rt-thead .rt-tr {
    text-align: center
  }


  .ReactTable .rt-thead .rt-th,
  .ReactTable .rt-thead .rt-td {
    padding: 5px 5px;
    line-height: normal;
    position: relative;
    border-right: 1px solid ${props => props.theme.colors.borderLight};
  }

  .ReactTable .rt-thead .rt-th.-sort-asc,
  .ReactTable .rt-thead .rt-td.-sort-asc {
    box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.6)
  }

  .ReactTable .rt-thead .rt-th.-sort-desc,
  .ReactTable .rt-thead .rt-td.-sort-desc {
    box-shadow: inset 0 -3px 0 0 rgba(0, 0, 0, 0.6)
  }

  .ReactTable .rt-thead .rt-th.-cursor-pointer,
  .ReactTable .rt-thead .rt-td.-cursor-pointer {
    cursor: pointer
  }

  .ReactTable .rt-thead .rt-th:last-child,
  .ReactTable .rt-thead .rt-td:last-child {
    border-right: 0
  }

  .ReactTable .rt-thead .rt-resizable-header {
    overflow: visible;
  }

  .ReactTable .rt-thead .rt-resizable-header:last-child {
    overflow: hidden
  }

  .ReactTable .rt-thead .rt-resizable-header-content {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ReactTable .rt-thead .rt-header-pivot {
    border-right-color: ${props => props.theme.colors.backgroundLight};
  }

  .ReactTable .rt-thead .rt-header-pivot:after,
  .ReactTable .rt-thead .rt-header-pivot:before {
    left: 100%;
    top: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none
  }

  .ReactTable .rt-thead .rt-header-pivot:after {
    border-color: rgba(255, 255, 255, 0);
    border-left-color: ${props => props.theme.colors.backgroundLight};
    border-width: 8px;
    margin-top: -8px
  }

  .ReactTable .rt-thead .rt-header-pivot:before {
    border-color: ${props => props.theme.colors.borderLight};
    border-left-color: ${props => props.theme.colors.borderLight};
    border-width: 10px;
    margin-top: -10px
  }

  .ReactTable .rt-tbody {
    flex: 99999 1 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    overflow: auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ReactTable .rt-tbody .rt-tr-group {
    border-bottom: solid 1px ${props => props.theme.colors.borderLight};
  }

  .ReactTable .rt-tbody .rt-tr-group:last-child {
    border-bottom: 0
  }

  .ReactTable .rt-tbody .rt-td {
    border-right: 1px solid ${props => props.theme.colors.borderLight};
  }

  .ReactTable .rt-tbody .rt-td:last-child {
    border-right: 0
  }

  .ReactTable .rt-tbody .rt-expandable {
    cursor: pointer
  }

  .ReactTable .rt-tr-group {
    flex: 1 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    flex-direction: column;
    align-items: stretch
  }

  .ReactTable .rt-tr {
    flex: 1 0 auto;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex
  }

  .ReactTable .rt-th,
  .ReactTable .rt-td {
    flex: 1 0 0;
    text-overflow: ellipsis;
    padding: 3px;
    -webkit-transition: .3s ease;
    transition: .3s ease;
    transition-property: width, min-width, padding, opacity;
  }

  .ReactTable .rt-th.-hidden,
  .ReactTable .rt-td.-hidden {
    width: 0 !important;
    min-width: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    opacity: 0 !important
  }

  .ReactTable .rt-expander {
    display: inline-block;
    position: relative;
    margin: 0;
    color: transparent;
    margin: 0 10px;
  }

  .ReactTable .rt-expander:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    border-left: 5.04px solid transparent;
    border-right: 5.04px solid transparent;
    border-top: 7px solid ${props => props.theme.colors.borderLight};
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    cursor: pointer
  }

  .ReactTable .rt-expander.-open:after {
    transform: translate(-50%, -50%) rotate(0)
  }

  .ReactTable .rt-resizer {
    display: inline-block;
    position: absolute;
    width: 36px;
    top: 0;
    bottom: 0;
    right: -18px;
    cursor: col-resize;
    z-index: 10
  }

  .ReactTable .rt-tfoot {
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);
  }

  .ReactTable .rt-tfoot .rt-td {
    border-right: 1px solid ${props => props.theme.colors.borderLight};
  }

  .ReactTable .rt-tfoot .rt-td:last-child {
    border-right: 0
  }

  .ReactTable.-striped .rt-tr.-odd {
    background: rgba(0, 0, 0, 0.03)
  }

  .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: rgba(0, 0, 0, 0.05)
  }

  .ReactTable .-pagination {
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-wrap: wrap;
    padding: 3px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-top: 2px solid ${props => props.theme.colors.borderLight};
  }

  .ReactTable .-pagination .-btn {
    appearance: none;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 3px;
    padding: 6px;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    background: rgba(0, 0, 0, 0.1);
    transition: all .1s ease;
    cursor: pointer;
    outline: none;
  }

  .ReactTable .-pagination .-btn[disabled] {
    opacity: .3;
    cursor: default
  }

  .ReactTable .-pagination .-btn:not([disabled]):hover {
    background: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.primaryText};
  }

  .ReactTable .-pagination .-previous,
  .ReactTable .-pagination .-next {

    flex: 1;
    text-align: center
  }

  .ReactTable .-pagination .-center {
    flex: 1.5;
    text-align: center;
    margin-bottom: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around
  }

  .ReactTable .-pagination .-pageInfo {
    display: inline-block;
    margin: 3px 10px;
    white-space: nowrap
  }

  .ReactTable .-pagination .-pageJump {
    display: inline-block;
  }

  .ReactTable .-pagination .-pageJump input {
    width: 70px;
    text-align: center
  }

  .ReactTable .-pagination .-pageSizeOptions {
    margin: 3px 10px
  }

  .ReactTable .rt-noData {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.theme.colors.backgroundLight};
    transition: all .3s ease;
    z-index: 1;
    pointer-events: none;
    padding: 20px;
    color: ${props => props.theme.colors.primaryText};
  }

  .ReactTable .-loading {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: ${props => props.theme.colors.backgroundLight};
    transition: all .3s ease;
    z-index: -1;
    opacity: 0;
    pointer-events: none;
  }

  .ReactTable .-loading>div {
    position: absolute;
    display: block;
    text-align: center;
    width: 100%;
    top: 50%;
    left: 0;
    font-size: 15px;
    color: ${props => props.theme.colors.primaryText};
    transform: translateY(-52%);
    transition: all .3s cubic-bezier(.25, .46, .45, .94)
  }

  .ReactTable .-loading.-active {
    opacity: 1;
    z-index: 2;
    pointer-events: all;
  }

  .ReactTable .-loading.-active>div {
    -webkit-transform: translateY(50%);
    transform: translateY(50%)
  }

  .ReactTable input,
  .ReactTable select {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 5px 7px;
    font-size: inherit;
    border-radius: 3px;
    font-weight: normal;
    outline: none
  }

  .ReactTable input:not([type="checkbox"]):not([type="radio"]),
  .ReactTable select {
    appearance: none;
  }

  .ReactTable input:not([type="checkbox"]):not([type="radio"])::-ms-expand,
  .ReactTable select::-ms-expand {
    display: none
  }

  .ReactTable .select-wrap {
    position: relative;
    display: inline-block;
  }

  .ReactTable .select-wrap select {
    padding: 5px 15px 5px 7px;
    min-width: 100px
  }

  .ReactTable .select-wrap:after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translate(0, -50%);
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 2.5px
  }

  .ReactTable .rt-resizing .rt-th,
  .ReactTable .rt-resizing .rt-td {
    transition: none !important;
    cursor: col-resize;
    user-select: none
  }

  .rt-td {
    display: flex;
    align-items: center;
  }

  .Toastify__toast-container {
  z-index: 9999;
  -webkit-transform: translate3d(0, 0, 9999px);
  transform: translate3d(0, 0, 9999px);;
  position: fixed;
  padding: 4px;
  width: 320px;
  box-sizing: border-box;
  color: $white;
}
.Toastify__toast-container--top-left {
  top: 1em;
  left: 1em;
}
.Toastify__toast-container--top-center {
  top: 1em;
  left: 50%;
  transform: translateX(-50%);
}
.Toastify__toast-container--top-right {
  top: 1em;
  right: 1em;
}
.Toastify__toast-container--bottom-left {
  bottom: 1em;
  left: 1em;
}
.Toastify__toast-container--bottom-center {
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
}
.Toastify__toast-container--bottom-right {
  bottom: 1em;
  right: 1em;
}

@media only screen and (max-width : 480px) {
  .Toastify__toast-container {
    width: 100vw;
    padding: 0;
    left: 0;
    margin: 0;
  }
  .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {
    top: 0;
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {
    bottom: 0;
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: 0;
    left: initial;
  }
}
.Toastify__toast {
  position: relative;
  min-height: 64px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: 8px;
  border-radius: 4px;
  box-shadow: $btn-box-shadow;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
  max-height: 800px;
  overflow: hidden;
  cursor: pointer;
  direction: ltr;
}
.Toastify__toast--rtl {
  direction: rtl;
}
.Toastify__toast--dark {
  background: #121212;
  color: $white;
}
.Toastify__toast--default {
  background: $white;
  color: $gray-700;
}
.Toastify__toast--info {
  background: ${props => props.theme.colors.primary};
  color: white;
}
.Toastify__toast--success {
  background: ${props => props.theme.colors.sucess};
  color: white;
}
.Toastify__toast--warning {
  background: ${props => props.theme.colors.info};
  color: white;
}
.Toastify__toast--error {
  background: ${props => props.theme.colors.danger};
  color: white;
}
.Toastify__toast-body {
  margin: auto 0;
  flex: 1 1 auto;
}

@media only screen and (max-width : 480px) {
  .Toastify__toast {
    margin-bottom: 0;
  }
}
.Toastify__close-button {
  color: white;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  border: none;
}

.Toastify__close-button > svg {
  fill: white;
  height: 16px;
  width: 14px;
  border: none;
}
.Toastify__close-button:hover, .Toastify__close-button:focus {
  opacity: 1;
  border: none;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}
.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  z-index: 9999;
  opacity: 0.7;
  background-color: rgba(255,255,255,0.5);
  transform-origin: left;
}
.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}
.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}
.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
}
.Toastify__progress-bar--default {
  background: linear-gradient(to right, $success, $info, $primary, $indigo, $purple, $danger);
}

.Toastify__progress-bar--dark {
  background: #bb86fc;
}
@keyframes Toastify__bounceInRight {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}
@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
}
@keyframes Toastify__bounceInLeft {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}
@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, 0, 0);
  }
}
@keyframes Toastify__bounceInUp {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, -10px, 0);
  }
  40%, 45% {
    opacity: 1;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}
@keyframes Toastify__bounceInDown {
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}
@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, 10px, 0);
  }
  40%, 45% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}
.Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}
.Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}
.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}
.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}
.Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}
.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}
.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}
@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}
.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}
@keyframes Toastify__flipOut {
  from {
    transform: perspective(400px);
  }
  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}
.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, 0, 0);
  }
}
@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, 0, 0);
  }
}
@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}
@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}
  .Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {
    animation-name: Toastify__slideInLeft;
  }
  .Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {
    animation-name: Toastify__slideInRight;
  }
  .Toastify__slide-enter--top-center {
    animation-name: Toastify__slideInDown;
  }
  .Toastify__slide-enter--bottom-center {
    animation-name: Toastify__slideInUp;
  }

  .Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {
    animation-name: Toastify__slideOutLeft;
  }
  .Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {
    animation-name: Toastify__slideOutRight;
  }
  .Toastify__slide-exit--top-center {
    animation-name: Toastify__slideOutUp;
  }
  .Toastify__slide-exit--bottom-center {
    animation-name: Toastify__slideOutDown;
  }

  .swal2-popup {
    display: none;
    position: relative;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    width: 32em;
    max-width: 100%;
    padding: 1.25em;
    border: none;
    border-radius: 4px;
    background: ${props => props.theme.colors.backgroundLight};
    font-family: inherit;
    font-size: 14px;
  }

  .swal2-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 1.8em;
  }

  .swal2-title {
    position: relative;
    max-width: 100%;
    margin: 0 0 .4em;
    padding: 0;
    color: ${props => props.theme.colors.primaryText};
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    text-transform: none;
    word-wrap: break-word;
  }

  .swal2-styled.swal2-confirm {
    border: 0;
    border-radius: 4px;
    background: initial;
    background-color: ${props => props.theme.colors.primary};
    color: #fff;
    font-size: 14px;
  }


  .swal2-styled.swal2-cancel {
    border: 0;
    border-radius: 4px;
    background: initial;
    background-color: ${props => props.theme.colors.backgroundLight};
    color: ${props => props.theme.colors.primaryText};
    font-size: 14px;
    border: none;
  }

  .swal2-icon.swal2-error {
    border-color: ${props => lighten(0.2, props.theme.colors.danger)};
    color: ${props => lighten(0.1, props.theme.colors.danger)};
  }

  .swal2-icon.swal2-error [class^=swal2-x-mark-line] {
    background-color: ${props => lighten(0.1, props.theme.colors.danger)};
  }

  .swal2-icon.swal2-question {
    border-color: ${props => lighten(0.4, props.theme.colors.info)};
    color: ${props => lighten(0.2, props.theme.colors.info)}
  }

  .swal2-icon.swal2-warning {
    border-color: ${props => lighten(0.08, props.theme.colors.warning)};
    color: ${props => lighten(0.04, props.theme.colors.warning)};
  }

  .swal2-close{
    transition: all 0.3s;
  }

  .swal2-close:hover {
    transform: none;
    background: 0 0;
    color: ${props => props.theme.colors.primaryText};
  }

  .swal2-input {
    height: 2.625em;
    padding: 0 .75em;
}

  .swal2-input {
    box-sizing: border-box;
    width: 100%;
    transition: all .3s;
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 4px;
    background: ${props => props.theme.colors.backgroundLight};
    box-shadow: none;
    color: inherit;
    font-size: 1.125em;
    height: 36px !important;
  }
`
interface FormRowProps {
  width?: string
}

export const FormRow = styled.div<FormRowProps>`
  display: flex;
  flex-direction: row;
  width: ${props => props.width ? props.width : '100%'};
  height: 60px;
  flex-wrap: wrap;

  & > div {
    & + div {
      margin-left: 7px;
    }
  }

`

interface StatusTextProps {
  status?: 'ativo' | 'inativo'
}

export const StatusText = styled.span<StatusTextProps>`
  color: ${props => props.status === 'ativo' ? props.theme.colors.info : props.theme.colors.danger};
  font-weight: 600;
`
