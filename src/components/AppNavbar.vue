<script setup lang="ts">
import BaseIcon from "@/components/ui/BaseIcon.vue";
import { useAppSettings } from "@/composables/useAppSettings";

const { closeDrawer } = useAppSettings();

function onLinkClick(event: Event, navigate) {
  closeDrawer();
  navigate(event);
}

const links = [
  { name: "home", label: "Home", icon: "home" },
  { name: "about", label: "About", icon: "about" },
  // { name: "contacts", label: "Contact us", icon: "contact-us" },
];
const footerLinks = [
  { name: "home", label: "Change account", icon: "change-account" },
  { name: "home", label: "Logout", icon: "logout" },
];
</script>

<template>
  <nav class="navbar">
    <div class="main">
      <ul>
        <router-link
          v-for="link in links"
          :key="link.label"
          v-slot="{ href, navigate }"
          :to="{ name: link.name }"
          custom
        >
          <li>
            <a :href="href" @click="onLinkClick($event, navigate)">
              <BaseIcon size="24" :name="link.icon" class="icon" fill1="currentColor" />
              <span>{{ link.label }}</span>
            </a>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="footer">
      <ul>
        <router-link
          v-for="link in footerLinks"
          :key="link.label"
          v-slot="{ href, navigate }"
          :to="{ name: link.name }"
          custom
        >
          <li>
            <a :href="href" @click="onLinkClick($event, navigate)">
              <BaseIcon size="24" :name="link.icon" class="icon" />
              <span>{{ link.label }}</span>
            </a>
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  min-width: 220px;
  padding: 1em;

  .notebook & {
    min-width: 220px;
  }

  .main,
  .footer {
    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        line-height: 3em;
        // padding-left: 1em;
        display: flex;
        align-items: center;
        color: var(--bbl-c-text-2);

        // border-bottom: solid 1px var(--bbl-c-divider);
        &:hover {
          color: var(--bbl-c-text-1);
          background-color: var(--bbl-c-bg-alt);
        }

        a {
          cursor: pointer;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0 2em 0 1em;
          color: var(--bbl-c-text-2);
          text-wrap: nowrap;
        }

        .icon {
          // color: var(--bbl-c-text-1);
          margin-right: 1em;
        }
      }

    }
  }

  .main {
    padding-bottom: 2em;
  }

  .footer {
    // padding-top: 1em;
    margin-top: 1em;
    padding-top: 0.7rem;
    border-top: 1px solid var(--bbl-c-divider);

  }
}
</style>
