<template>
	<v-app>
		<v-card class="mx-auto my-12" align="center">
			<v-card-title>Auth System</v-card-title>

			<v-container align="center">
				<div align="left">
					<v-text-field label="Enter Token" v-model="token"></v-text-field>
				</div>
				<v-btn class="mr-2" target="_blank" text @click="authData">CONNECT</v-btn>
			</v-container>
		</v-card>
	</v-app>
</template>

<script>
	import { mapMutations } from "vuex";

	export default {
		data: () => ({
			token: ""
		}),

		methods: {
			...mapMutations(["authing"]),
			authData() {
				let _this = this;

				if (!_this.token) {
					this.$toastr.warning("", "缺少访问密钥");
					return;
				}

				this.$axios({
					methods: "get",
					url: `/capi/auth?token=${_this.token}`,
					headers: {
						"content-type": "application/json"
					}
				})
					.then(function(resp) {
						let d = resp.data;
						if (d.status != 200 && d.msg != "OK") {
							_this.$toastr.warning("", "请检查密钥是否输入正确");
							return;
						}

						_this.$toastr.success("", "验证通过");

						_this.authing({
							Authorization: _this.token
						});
						_this.$router.push("/home");
					})
					.catch(() => {
						_this.$toastr.error("", "该目标不存在实例");
					});
			}
		}
	};
</script>
