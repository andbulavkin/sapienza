<template>
    <div>
        <table class="table table-striped subTable">
            <thead>
                <tr
                    data-toggle="collapse"
                    data-target="#Flower1"
                    class="accordion-toggle"
                >
                    <th></th>
                    <th></th>
                    <th>From Day of cycle</th>
                    <th>To Day of cycle</th>
                    <th>EC Min-Max</th>
                    <th>pH Min-Max</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in items"
                    :key="item.subsrateTargetSubId"
                >
                    <td></td>
                    <td></td>
                    <td class="border-bottom">
                        <span v-if="selectedRow[index]">
                            <b-form-input
                                type="number"
                                v-model="items[index].fromDay"
                                placeholder="From day"
                            ></b-form-input>
                            <p
                                class="text-danger mb-0"
                                v-if="errors.fromDay"
                            >
                                {{ errors.fromDay[0] }}
                            </p>
                        </span>
                        <span v-else>{{ items[index].fromDay }}</span>
                    </td>
                    <td class="border-bottom">
                        <span v-if="selectedRow[index]">
                            <b-form-input
                                type="number"
                                v-model="items[index].toDay"
                                placeholder="To day"
                                v-on:keypress="isNumber($event)"
                                :class="errors.toDay?'errorMsg':''"
                            ></b-form-input>
                        </span>
                        <span v-else>{{ items[index].toDay }}</span>
                    </td>
                    <td class="border-bottom">
                        <span v-if="selectedRow[index]">
                            <b-form-input
                                type="text"
                                v-model="items[index].ecMinMax"
                                placeholder="e.g. 1.0–2.5"
                                :class="errors.ecMinMax?'errorMsg':''"
                                v-on:keyup="setFormat($event)"
                            ></b-form-input>
                        </span>
                        <span v-else>{{ items[index].ecMinMax }}</span>
                    </td>
                    <td class="border-bottom">
                        <span v-if="selectedRow[index]">
                            <b-form-input
                                type="text"
                                v-model="items[index].phMinMax"
                                placeholder="e.g. 5.5–6.2"
                                :class="errors.phMinMax?'errorMsg':''"
                                v-on:keyup="setFormat($event)"
                            ></b-form-input>
                        </span>
                        <span v-else>{{ items[index].phMinMax }}</span>
                    </td>
                    <td class="border-bottom"></td>
                    <td class="border-bottom">
                        <b-button class="bg-transparent border-0">
                            <div class="d-flex">
                                <span v-if="!selectedRow[index]">
                                    <img
                                        src="./../assets/images/edit-data.svg"
                                        alt="Edit Row"
                                        @click="edit(index)"
                                    />
                                </span>
                                <span
                                    v-else
                                    v-on:click="save(index)"
                                >
                                    <img
                                        src="./../assets/images/done.svg"
                                        alt="Done Row"
                                    />
                                </span>
                            </div>
                        </b-button>
                        <a
                            href="#"
                            class="ml-3"
                        >
                            <img
                                src="./../assets/images/delete-data.svg"
                                alt="Delete Row"
                                v-on:click="openDelete(index)"
                            />
                        </a>
                    </td>
                </tr>
                <tr>
                    <td colspan="6"></td>
                    <td colspan="2">
                        <a
                            href="javascript:void(0)"
                            class="btn btn-primary"
                            @click="addNew"
                        >
                            Add Field
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- Delect Model -->
        <div
            class="modal fade"
            id="DeleteSubField"
            tabindex="-1"
            role="dialog"
            aria-labelledby="DeleteFieldLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-centered"
                role="document"
            >
                <div class="modal-content">
                    <div class="modal-body">
                        <img
                            src="./../assets/images/delete-message.svg"
                            alt="Delete Message"
                        />
                        <h3>Are You sure about deleting this field ?</h3>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button
                            type="button"
                            class="btn btn-danger"
                            v-on:click="deleteSubData"
                        >
                            Yes , delete
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-danger"
                            data-dismiss="modal"
                        >
                            No , Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;
export default {
    name: "SubsrateECPHTargetTr",
    data() {
        return {
            items: [],
            selectedRow: {},
            deleteId: "",
            errors: [],
        };
    },
    props: ["ParentId"],
    methods: {
        getData() {
            this.$http
                .get(this.$apiBaseUrl + "subsrate-target-sub/" + this.ParentId, {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    this.items = response.data.data;
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                });
        },
        addNew() {
            this.removeEmpty();
            if (this.items.length > 0) {
                this.items.push({
                    subsrateTargetSubId: "",
                    subsrateTargetID: this.ParentId,
                    fromDay: this.items[this.items.length - 1].toDay + 1,
                    toDay: "",
                    ecMinMax: "",
                    phMinMax: "",
                });
            } else {
                this.items.push({
                    subsrateTargetSubId: "",
                    subsrateTargetID: this.ParentId,
                    fromDay: 1,
                    toDay: "",
                    ecMinMax: "",
                    phMinMax: "",
                });
            }
            this.selectedRow = { [this.items.length - 1]: true };
        },
        edit(index) {
            this.removeEmpty();
            this.errors = [];
            this.selectedRow = {
                [index]: true,
            };
        },
        save(index) {
            this.errors = [];
            var targetData = this.items[index];
            if (targetData.fromDay >= targetData.toDay) {
                this.$toast.error("To day is greater than from day.", {
                    position: "top-right",
                });
            } else {
                if (targetData.subsrateTargetSubId != "") {
                    this.update(index);
                } else {
                    this.store(index);
                }
            }
        },
        store(index) {
            this.$http
                .post(
                    this.$apiBaseUrl + "subsrate-target-sub",
                    {
                        subsrateTargetID: this.items[index].subsrateTargetID,
                        fromDay: this.items[index].fromDay,
                        toDay: this.items[index].toDay,
                        ecMinMax: this.items[index].ecMinMax,
                        phMinMax: this.items[index].phMinMax,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.selectedRow = {};
                    this.getData(this.type);
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else if (error.response.status == 422) {
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        let errors = Object.keys(this.errors).map((key) => [this.errors[key]]);
                        let errorMsg = "";
                        if (errors.length > 0) {
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                        }
                        this.$toast.error(errorMsg, {
                            position: "top-right",
                        });
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        update(index) {
            this.$http
                .put(
                    this.$apiBaseUrl +
                    "subsrate-target-sub/" +
                    this.items[index].subsrateTargetSubId,
                    {
                        fromDay: this.items[index].fromDay,
                        toDay: this.items[index].toDay,
                        ecMinMax: this.items[index].ecMinMax,
                        phMinMax: this.items[index].phMinMax,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.selectedRow = {};
                    this.getData();
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else if (error.response.status == 422) {
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        let errors = Object.keys(this.errors).map((key) => [this.errors[key]]);
                        let errorMsg = "";
                        if (errors.length > 0) {
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                        }
                        this.$toast.error(errorMsg, {
                            position: "top-right",
                        });
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        openDelete(id) {
            this.deleteId = this.items[id].subsrateTargetSubId;
            $("#DeleteSubField").modal("show");
        },
        deleteSubData() {
            if (this.deleteId != "") {
                this.$http
                    .delete(
                        this.$apiBaseUrl + "subsrate-target-sub/" + this.deleteId,
                        {
                            headers: {
                                Authorization: this.accessToken(),
                            },
                        }
                    )
                    .then((response) => {
                        this.getData();
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        this.deleteId = "";
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    });
            } else {
                this.getData();
                this.$toast.success("Subsrate target sub deleted successfully.", {
                    position: "top-right",
                });
            }
            $("#DeleteSubField").modal("hide");
        },
        removeEmpty() {
            if (
                this.items[this.items.length - 1] &&
                this.items[this.items.length - 1].subsrateTargetSubId == ""
            ) {
                this.items.pop();
            }
        },
        isNumber: function (evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        setFormat(evt) {
            let val = $(evt.target).val();
            let arr = val.split('-');
            if (arr.length > 2) {
                val = val.substring(0, val.length - 1);
            } else {
                if (!$.isNumeric(arr[0]) || arr[0] < 0 || arr[0] > 15) {
                    val = val.substring(0, val.length - 1);
                }
                if (arr.length > 1) {
                    if (!$.isNumeric(arr[1]) && arr[1] != "" || arr[1] < 0 || arr[1] > 15) {
                        val = val.substring(0, val.length - 1);
                    }
                    // else {
                    //     if (arr[1] != "" && arr[1] != "") {
                    //         if (arr[0] > arr[1]) {
                    //             val = val.substring(0, val.length - 1);
                    //         }
                    //     }
                    // }
                }
            }
            $(evt.target).val(val);
        }
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped>
.subsrate-content
    .panel-body
    .table-striped
    .subTable
    tbody
    tr:nth-of-type(odd) {
    border-top: none;
}
.subTable thead {
    border-bottom: 1px solid #dee2e6;
}
#DeleteSubField .modal-dialog {
    max-width: 592px;
}
#DeleteSubField .modal-content {
    background: #ffffff;
    box-shadow: 0px 4px 57px rgb(0 0 0 / 8%);
    border-radius: 36px;
    padding: 36px;
}
#DeleteSubField .modal-body {
    text-align: center;
}
#DeleteSubField .modal-footer {
    border: 0;
}
#DeleteSubField .modal-body h3 {
    font-family: "Mulish";
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #040415;
    max-width: 350px;
    margin: 48px auto 0px;
}
#DeleteSubField .modal-footer .btn-danger {
    background: #eb5757;
    border-radius: 4px;
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;
    padding: 13px 20px;
    width: 45%;
    cursor: pointer;
    border-color: transparent;
}
#DeleteSubField .modal-footer .btn-outline-danger {
    background: #fce6e6;
    border-radius: 4px;
    font-family: "Mulish";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: #eb5757;
    padding: 13px 20px;
    width: 45%;
    cursor: pointer;
    border-color: transparent;
}
.subTable .btn-primary {
    border-radius: 4px;
    font-family: "Mulish";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 16px;
    color: #2f80ed;
    background-color: #e0ecfd;
    border-color: transparent !important;
    padding: 10px 20px;
    margin: 0px 5px;
}
</style>
