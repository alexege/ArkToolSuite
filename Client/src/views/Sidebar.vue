<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img src="https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/d/d3/Giganotosaurus.png/" alt="">
            <!-- <span class="material-icons">menu</span> -->
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons">keyboard_double_arrow_right</span>
			</button>
		</div>

		<h3>Menu</h3>
		<div class="menu">
			<router-link to="/" class="button">
				<span class="material-icons">home</span>
				<span class="text">Dashboard</span>
			</router-link>
			<router-link to="/user" class="button">
				<span class="material-icons">description</span>
				<span class="text">User</span>
			</router-link>
			<router-link to="/timers" class="button">
				<span class="material-icons">timer</span>
				<span class="text">Timers</span>
			</router-link>
            <div>
            </div>
			<router-link to="/layouts" class="button">
				<span class="material-icons">description</span>
				<span class="text">Layouts</span>
			</router-link>
			<router-link to="/todo" class="button">
				<span class="material-icons">fact_check</span>
				<span class="text">todo</span>
			</router-link>
		</div>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/settings" class="button">
				<span class="material-icons">settings</span>
				<span class="text">Settings</span>
			</router-link>
		</div>

		<div :style="contentStyle" class="content">
		<p :style="infoStyle" class="info">{{ info }}</p>
		</div>

	</aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimerStore } from '../stores/timer.store.js'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
}

// Accordion Toggle
const expanded = ref(false);
const contentStyle = computed(() => {
	return { "max-height": expanded.value? "100px" : 0 }
});

const infoStyle = computed(() => {
	return { opacity: expanded.value ? 1 : 0 }
})

// Add Timers
const { addTimer, deleteTimer } = useTimerStore()
async function add(type) {

    var data = {
        name: 'Timer Name',
        type: type,
        creator: null,
        img: 'https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg'
    }

    await addTimer(data)
    .then((res) => {
        console.log("added item with result:", res);
    })
}

async function close(timerId) {
    await deleteTimer(timerId)
}

</script>

<style lang="scss" scoped>

aside {
	display: flex;
	flex-direction: column;

	// background-color: var(--dark);
	background-color: #081c24;
	color: var(--light);

    border-right: 1px solid white;

	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
	// height: 100vh;

	transition: 0.2s ease-in-out;

	.flex {
		flex: 1 1 0%;
	}

	.logo {
		margin-bottom: 1rem;

		img {
			width: 4rem;
			background-color: white;
			border-radius: 50%;
			margin: .25em;
			padding: 10px;
		}
	}

	.menu-toggle-wrap {
		display: flex;
		justify-content: flex-end;
		margin-bottom: 1rem;

		position: relative;
		top: 0;
		transition: 0.2s ease-in-out;

		.menu-toggle {
			transition: 0.2s ease-in-out;
			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-out;
			}
			
			&:hover {
				.material-icons {
					color: var(--primary);
					transform: translateX(0.5rem);
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}

	h3 {
		color: var(--grey);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.menu {
		margin: 0 -1rem;

		.timer-options {
			display: flex;
			flex-direction: column;
			justify-content: start
		}

        .timer-selection {
            display: flex;
            justify-content: center;
        }

		.button {
			display: flex;
			align-items: center;
			text-decoration: none;

			transition: 0.2s ease-in-out;
			padding: 0.5rem 1rem;

			.material-icons {
				font-size: 2rem;
				color: var(--light);
				transition: 0.2s ease-in-out;
			}
			.text {
				color: var(--light);
				transition: 0.2s ease-in-out;
			}

			&:hover {
				background-color: var(--dark-alt);

				.material-icons, .text {
					color: var(--primary);
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt);
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary);
				}
			}
		}
	}

	.footer {
		opacity: 0;
		transition: opacity 0.3s ease-in-out;

		p {
			font-size: 0.875rem;
			color: var(--grey);
		}
	}

	&.is-expanded {
		width: var(--sidebar-width);

		.menu-toggle-wrap {
			top: -3rem;
			
			.menu-toggle {
				transform: rotate(-180deg);
			}
		}

		h3, .button .text {
			opacity: 1;
		}

		.button {
			
			.material-icons {
				margin-right: 1rem;
			}
		}

		.footer {
			opacity: 0;
		}
	}

	@media (max-width: 1024px) {
		position: absolute;
		z-index: 99;
	}
}


</style>