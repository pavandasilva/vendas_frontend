import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
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
    -webkit-box-flex: 99999;
    -ms-flex: 99999 1 auto;
    flex: 99999 1 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: auto;
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
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch
  }

  .ReactTable .rt-tr {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 auto;
    flex: 1 0 auto;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex
  }

  .ReactTable .rt-th,
  .ReactTable .rt-td {
    -webkit-box-flex: 1;
    -ms-flex: 1 0 0px;
    flex: 1 0 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 7px 5px;
    overflow: hidden;
    -webkit-transition: .3s ease;
    transition: .3s ease;
    -webkit-transition-property: width, min-width, padding, opacity;
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
    -webkit-transform: translate(-50%, -50%) rotate(-90deg);
    transform: translate(-50%, -50%) rotate(-90deg);
    border-left: 5.04px solid transparent;
    border-right: 5.04px solid transparent;
    border-top: 7px solid ${props => props.theme.colors.borderLight};
    -webkit-transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    cursor: pointer
  }

  .ReactTable .rt-expander.-open:after {
    -webkit-transform: translate(-50%, -50%) rotate(0);
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: 3px;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.1);
    border-top: 2px solid ${props => props.theme.colors.borderLight};
  }

  .ReactTable .-pagination .-btn {
    -webkit-appearance: none;
    -moz-appearance: none;
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
    -webkit-transition: all .1s ease;
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
    -webkit-transform: translateY(-52%);
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
    -webkit-appearance: none;
    -moz-appearance: none;
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
    -webkit-transform: translate(0, -50%);
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
`
