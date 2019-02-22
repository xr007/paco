/* global document */

import React from 'react';
import Link from 'next/link';

import {
  Logo,
  Blog,
  Burger,
  Projects,
} from '../components/icons';

class Menu extends React.Component {
  constructor(props) {
    super(props);

    const { theme } = this.props;
    this.state = {
      isSubMenuVisible: false,
      isWhite: theme === 'white',
    };
  }

  componentDidMount() {
    document.addEventListener('click', e => this.handleClickOutside(e));
    document.addEventListener('keydown', e => this.handleKey(e));
  }

  componentWillUnmount() {
    // TODO: fix these remove event listeners? Arrow function removable?
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKey);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.setState({
        isSubMenuVisible: false,
      });
    }
  }

  handleKey(e) {
    if (e.keyCode === 27) {
      // Close menu on 'ESC'
      this.setState({
        isSubMenuVisible: false,
      });
    } else if (e.keyCode === 77) {
      // Toggle menu on 'M'
      this.toggleMenu();
    } else if (e.keyCode === 84) {
      // Toggle theme on 'T'
      this.toggleTheme();
    }
  }

  toggleMenu(s) {
    if (s) {
      this.setState({
        isSubMenuVisible: s,
      });
    } else {
      this.setState(state => ({
        isSubMenuVisible: !state.isSubMenuVisible,
      }));
    }
  }

  toggleTheme() {
    this.setState(state => ({
      isWhite: !state.isWhite,
    }), () => {
      const { isWhite } = this.state;
      const theme = isWhite ? 'white' : 'black';
      console.log(`Setting cookie: ${theme}`);
      document.cookie = `theme=${theme}`;
    });
  }

  render() {
    const { isSubMenuVisible } = this.state;

    return (
      <div className={isSubMenuVisible ? 'menu visible' : 'menu'} ref={n => this.setWrapperRef(n)}>
        <Link href="/">
          <div className="logo">
            <Logo />
          </div>
        </Link>

        <div className="blog" onClick={() => {this.toggleMenu(false)}}>
          <Link href="/blog">
            <div>
              <h2>Blog</h2>
              <Blog />
            </div>
          </Link>
        </div>

        <div className="burger" onClick={() => {this.toggleMenu()}} onKeyDown={() => {this.handleKey()}}>
          <Burger />
        </div>

        <div className="projects" onClick={() => {this.toggleMenu(false)}}>
          <Link href="/projects">
            <div>
              <Projects />
              <h2>Projects</h2>
            </div>
          </Link>
        </div>

        <div className="toggle" onClick={() => {this.toggleTheme()}} />

        <style jsx>
          {`
          .menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 30px 0;
          }

          .toggle, .logo, .burger, .blog, .projects {
            cursor: pointer;
          }

          .logo {
            transition: opacity 300ms ease-in-out;
          }

          .toggle {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid var(--color);
            transition: background 300ms ease-in-out, border 300ms ease-in-out, opacity 300ms ease-in-out;
          }

          .toggle:hover {
            background-color: var(--color);
            transition: background 300ms ease-in-out, border 300ms ease-in-out;
          }

          .blog, .projects {
            pointer-events: none;
            opacity: 0;
            transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
          }

          .blog div, .projects div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .blog h2,
          .projects h2 {
            user-select: none;
            font-size: 1rem;
            opacity: 0;
            transition: opacity 300ms ease-in-out;
          }

          .blog { transform: translateY(20px); }
          .projects { transform: translateY(-20px); }

          .blog:hover h2,
          .projects:hover h2 {
            opacity: 1;
            transition: opacity 300ms ease-in-out;
          }

          .burger :global(svg path) {
            transition: transform 300ms ease-in-out;
          }

          .logo :global(svg path),
          .burger :global(svg path),
          .blog :global(svg path),
          .projects :global(svg path) {
            stroke: var(--color);
            fill: var(--bg);
          }

          .menu.visible .logo,
          .menu.visible .toggle {
            opacity: 0;
            transition: opacity 300ms ease-in-out;
          }

          .menu.visible .blog,
          .menu.visible .projects {
            pointer-events: all;
            opacity: 1;
            transform: translateY(0);
          }

          .menu.visible .burger svg path:nth-child(1) {
            transform: translateY(42%);
            transition: transform 300ms ease-in-out;
          }

          .menu.visible .burger svg path:nth-child(3) {
            transform: translateY(-42%);
            transition: transform 300ms ease-in-out;
          }
      `}
        </style>

        <style jsx global>
          {`
          :root {
            --color: ${this.state.isWhite ? '#111' : '#fdfdfd'} !important;
            --bg: ${this.state.isWhite ? '#fdfdfd' : '#111'} !important;
            --gray: ${this.state.isWhite ? '#7f7f7f' : '#666'} !important;
            --light-gray: ${this.state.isWhite ? '#f0f0f0' : '#333'} !important;
          }
          `}
        </style>
      </div>
    );
  }
}

export default Menu;
