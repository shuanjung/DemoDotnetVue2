<template>
    <div class="SearchBar">
        <div class="card Searchbar">
            <b-input-group class="searchFix">
                <template #append>
                    <b-input-group-text class="clearStyle">
                        <b-icon icon="x"></b-icon>
                    </b-input-group-text>
                    <b-input-group-text class="iconFix">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-text>
                </template>
                <b-form-input placeholder="關鍵字查詢"></b-form-input>
            </b-input-group>
        </div>
    </div>
</template>
<script>
export default {
    name: "SearchBar"
}
</script>