import {writable} from "svelte/store";

export const apiData = writable([]);

export const token = localStorage.getItem('token');

export const role = localStorage.getItem('role');

export const id = localStorage.getItem('id');

export const username = localStorage.getItem('username');