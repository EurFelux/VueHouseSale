<template>
    <div class="manage-user-panel">
        <h2>用户管理</h2>
        <el-table :data="users" style="width: 100%">
            <el-table-column label="ID" prop="id"></el-table-column>
            <el-table-column label="用户名" prop="name"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="年龄" prop="age"></el-table-column>
            <el-table-column label="身份" prop="role"></el-table-column>
            <el-table-column label="简介" prop="introduction"></el-table-column>
            <el-table-column label="地址" prop="location"></el-table-column>
        </el-table>

    </div>
</template>


<script setup lang="ts">
import { RoleMap, SexMap, SexText, type User } from '@/api/model';
import { getAllUsers } from '@/api/user';
import { generalError } from '@/mixin';

const users = ref<Array<any>>([])

function getUsers() {
    getAllUsers().then(res => {
        users.value = res.data.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                phone: item.phone,
                role: RoleMap[item.role],
                sex: SexMap[item.sex],
                age: item.age,
                introduction: item.introduction,
                location: item.location
            }
        })
    }).catch(err => {
        generalError(err)
    })
}

onMounted(() => {
    getUsers()
})


</script>


<style scoped lang="scss">
h2 {
    margin: 1rem 0;
    border-bottom: 2px solid var(--el-color-primary);
}
</style>