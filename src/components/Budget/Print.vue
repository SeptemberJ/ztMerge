<template>
<section>
  <div id="printBox" class="Print" style="background: #fff;">
    <h2 class="MarginB_20" style="text-align:center;">工程项目预决算表</h2>
    <section>
      <table id="topInfo" cellspacing="0" class="" style="width: 100%;text-align: left;background: #fff;border: 0px solid #DCDFE6;">
        <tbody>
          <tr>
            <td width="20%">公司名称：{{formBudget['公司名称']}}</td>
            <td width="60%">客户名称：{{formBudget['公司名称']}}</td>
            <td width="20%">公司名称：{{formBudget['公司名称']}}</td>
          </tr>
          <tr>
            <td width="20%">事业部：{{formBudget['事业部']}}</td>
            <td width="60%">项目名称：{{formBudget['项目名称']}}</td>
            <td width="20%">竣工日期：{{formBudget['竣工日期']}}</td>
          </tr>
          <tr>
            <td width="20%">销售员：{{formBudget['销售员']}}</td>
            <td width="60%">项目经理：{{formBudget['项目经理']}}</td>
            <td width="20%">项目类别：{{formBudget['项目类别']}}</td>
          </tr>
          <tr>
            <td width="20%">税率：{{formBudget['税率']}}</td>
            <td width="60%">利率{{formBudget['利率']}}</td>
          </tr>
        </tbody>
      </table>
      <!-- <el-form class="DisabledNormal" :model="formBudget" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="公司名称：" size="mini">
              <span>{{formBudget['公司名称']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称：" size="mini">
              <span>{{formBudget['客户名称']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="编制日期：" size="mini">
              <span>{{formBudget['编制日期']}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="事业部：" size="mini">
              <span>{{formBudget['事业部']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称：" size="mini">
              <span>{{formBudget['项目名称']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="竣工日期：" size="mini">
              <span>{{formBudget['竣工日期']}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="销售员：" size="mini">
              <span>{{formBudget['销售员']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目经理：" size="mini">
              <span>{{formBudget['项目经理']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="项目类别：" size="mini">
              <span>{{formBudget['项目类别']}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="税率：" size="mini">
              <span>{{formBudget['税率']}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="利率：" size="mini">
              <span>{{formBudget['利率']}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form> -->
    </section>
    <!-- table -->
    <table id="budget" cellspacing="0" class="MarginB_20" style="width: 100%;background: #fff;border-top: 1px solid #DCDFE6;border-left: 1px solid #DCDFE6;">
      <thead>
        <tr>
          <th width="60px">序号</th>
          <th width="130px"></th>
          <th width="150px">分类款项</th>
          <th width="150px">预算(元）</th>
          <th width="150px">决算（元）</th>
          <th width="150px">财务数据</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <!-- line1 -->
        <tr class="FontBold">
          <td>1</td>
          <td>1001</td>
          <td>项目合同总价</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['1001'] > 0 ? budget['1001'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['1001'] > 0 ? finalAccounts['1001'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['1001'] > 0 ? financialData['1001'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['1001']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(0)">
          <td></td>
          <td>1001.01</td>
          <td>设备</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['100101']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['100101'] > 0 ? finalAccounts['100101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['100101'] > 0 ? financialData['100101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['100101']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(0)">
          <td></td>
          <td>1001.02</td>
          <td>安装</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'"><span>{{budget['100102']}}</span></span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['100102'] > 0 ? finalAccounts['100102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['100102'] > 0 ? financialData['100102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['100102']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(0)">
          <td></td>
          <td>1001.03</td>
          <td>综合</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'"><span>{{budget['100103']}}</span></span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['100103'] > 0 ? finalAccounts['100103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['100103'] > 0 ? financialData['100103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['100103']}}</span></td>
        </tr>
        <!-- line2 -->
        <tr class="FontBold">
          <td>2</td>
          <td>1201</td>
          <td>设备及材料合计</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['1201'] > 0 ? budget['1201'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['1201'] > 0 ? finalAccounts['1201'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['1201'] > 0 ? financialData['1201'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1201']}}</td>
        </tr>
        <tr @dblclick="seeDetail(1, '主设备')">
          <td></td>
          <td>1201.01</td>
          <td>主设备</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['120101']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['120101'] > 0 ? finalAccounts['120101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['120101'] > 0 ? financialData['120101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['120101']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(1, '配套设备')">
          <td></td>
          <td>1201.02</td>
          <td>配套设备</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['120102']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['120102'] > 0 ? finalAccounts['120102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['120102'] > 0 ? financialData['120102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['120102']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(1, '其他部件费')">
          <td></td>
          <td>1201.03</td>
          <td>其他部件费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['120103']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['120103'] > 0 ? finalAccounts['120103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['120103'] > 0 ? financialData['120103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['120103']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(1, '其他材料')">
          <td></td>
          <td>1201.04</td>
          <td>其他材料</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['120104']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['120104'] > 0 ? finalAccounts['120104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['120104'] > 0 ? financialData['120104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['120104']}}</span></td>
        </tr>
        <!-- line3 -->
        <tr class="FontBold">
          <td>3</td>
          <td>1301</td>
          <td>安装合计</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['1301'] > 0 ? budget['1301'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['1301'] > 0 ? finalAccounts['1301'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['1301'] > 0 ? financialData['1301'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1301']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1301.01</td>
          <td>材料及人工调试费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['130101']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['130101'] > 0 ? finalAccounts['130101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['130101'] > 0 ? financialData['130101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['130101']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '130104')">
          <td></td>
          <td>1301.04</td>
          <td>外包费用</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['130104']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['130104'] > 0 ? finalAccounts['130104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['130104'] > 0 ? financialData['130104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['130104']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '总包配合费')">
          <td></td>
          <td>1301.05</td>
          <td>配合费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['130105']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['130105'] > 0 ? finalAccounts['130105'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['130105'] > 0 ? financialData['130105'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['130105']}}</span></td>
        </tr>
        <tr>
          <td></td>
          <td>1301.06</td>
          <td>其他</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['130106']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['130106'] > 0 ? finalAccounts['130106'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['130106'] > 0 ? financialData['130106'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['130106']}}</span></td>
        </tr>
        <!-- line4 -->
        <tr class="FontBold">
          <td>4</td>
          <td>1401</td>
          <td>营业费用合计</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['1401'] > 0 ? budget['1401'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['1401'] > 0 ? finalAccounts['1401'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['1401'] > 0 ? financialData['1401'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1401']}}</td>
        </tr>
        <tr @dblclick="seeDetail(2, '差旅费')">
          <td></td>
          <td>1401.01</td>
          <td>差旅费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140101']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140101'] > 0 ? finalAccounts['140101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140101'] > 0 ? financialData['140101'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140101']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '招待费')">
          <td></td>
          <td>1401.02</td>
          <td>招待费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140102']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140102'] > 0 ? finalAccounts['140102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140102'] > 0 ? financialData['140102'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140102']}}</span></td>
        </tr>
        <tr>
          <td></td>
          <td>1401.03</td>
          <td>标书及嗮图费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140103']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140103'] > 0 ? finalAccounts['140103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140103'] > 0 ? financialData['140103'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140103']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '劳务费')">
          <td></td>
          <td>1401.04</td>
          <td>劳务费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140104']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140104'] > 0 ? finalAccounts['140104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140104'] > 0 ? financialData['140104'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140104']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '投标费')">
          <td></td>
          <td>1401.05</td>
          <td>中标服务费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140105']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140105'] > 0 ? finalAccounts['140105'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140105'] > 0 ? financialData['140105'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140105']}}</span></td>
        </tr>
        <tr @dblclick="seeDetail(2, '140106')">
          <td></td>
          <td>1401.06</td>
          <td>其他综合费用</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{budget['140106']}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{finalAccounts['140106'] > 0 ? finalAccounts['140106'] : ''}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{financialData['140106'] > 0 ? financialData['140106'] : ''}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft"><span>{{note['140106']}}</span></td>
        </tr>
        <!-- line5 -->
        <tr class="FontBold">
          <td>5</td>
          <td>1501</td>
          <td>税费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(Number(formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + 0 + (Number(budget['1001'] * rateCompany)) + (Number(budget['1001'] * 0.0003)) + (Number(budget['1001'] * rateManagement))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + 0 + (Number(finalAccounts['1001'] * rateCompany)) + (Number(finalAccounts['1001'] * 0.0003)) + (Number(finalAccounts['1001'] * rateManagement))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number(formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + 0 + Number((formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + 0 + (Number(financialData['1001'] * rateCompany)) + (Number(financialData['1001'] * 0.0003)) + (Number(financialData['1001'] * rateManagement))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1501']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.01</td>
          <td>增值税 13%</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['150101']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.02</td>
          <td>增值税 3%</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170102']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.03</td>
          <td>增值税 9%</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170103']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.12</td>
          <td>税金附加</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170112']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.13</td>
          <td>企业所得税</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(Number(budget['1001']) * rateCompany).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(finalAccounts['1001']) * rateCompany).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(financialData['1001']) * rateCompany).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170113']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.14</td>
          <td>印花税</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(Number(budget['1001']) * 0.0003).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(finalAccounts['1001']) * 0.0003).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(financialData['1001']) * 0.0003).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170114']}}</td>
        </tr>
        <tr>
          <td></td>
          <td>1501.15</td>
          <td>管理费</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(Number(budget['1001']) * rateManagement).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(finalAccounts['1001']) * rateManagement).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(financialData['1001']) * rateManagement).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['170115']}}</td>
        </tr>
        <!-- line6 -->
        <tr>
          <td>6</td>
          <td>1601</td>
          <td>毛利润</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{(Number(budget['1001']) - Number(budget['1201']) - Number(budget['1301']) - Number(budget['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(budget['1001']) * rateCompany).toFixed(2)) + Number((Number(budget['1001']) * 0.0003).toFixed(2)) + Number((Number(budget['1001']) * rateManagement).toFixed(2)))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(finalAccounts['1001']) - Number(finalAccounts['1201']) - Number(finalAccounts['1301']) - Number(finalAccounts['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(finalAccounts['1001']) * rateCompany).toFixed(2)) + Number((Number(finalAccounts['1001']) * 0.0003).toFixed(2)) + Number((Number(finalAccounts['1001']) * rateManagement).toFixed(2)))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_127 == 'True'">{{(Number(financialData['100101']) - Number(financialData['1201']) - Number(financialData['1301']) - Number(financialData['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(financialData['1001']) * rateCompany).toFixed(2)) + Number((Number(financialData['1001']) * 0.0003).toFixed(2)) + Number((Number(financialData['1001']) * rateManagement).toFixed(2)))).toFixed(2)}}</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1601']}}</td>
        </tr>
        <!-- line7 -->
        <tr>
          <td>7</td>
          <td>1701</td>
          <td>资金占用</td>
          <td></td>
          <td></td>
          <td></td>
          <td class="TextLeft">{{note['1701']}}</td>
        </tr>
        <!-- line8 -->
        <tr>
          <td>8</td>
          <td>1801</td>
          <td>毛利率</td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{!Number(budget['1001']) ? 0 : (((Number(budget['1001']) - Number(budget['1201']) - Number(budget['1301']) - Number(budget['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(budget['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(budget['1001']) / 1.09 * 0.09 - Number(budget['1201']) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(budget['1001']) - Number(budget['1201'])) / 1.13 * 0.13 - Number(budget['130102']) / 1.09 * 0.09 - Number(budget['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(budget['1001']) * rateCompany).toFixed(2)) + Number((Number(budget['1001']) * 0.0003).toFixed(2)) + Number((Number(budget['1001']) * rateManagement).toFixed(2)))).toFixed(2)) / Number(budget['1001']) * 100).toFixed(2)}}%</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{!Number(finalAccounts['1001']) ? 0 : (((Number(finalAccounts['1001']) - Number(finalAccounts['1201']) - Number(finalAccounts['1301']) - Number(finalAccounts['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(finalAccounts['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(finalAccounts['1001']) / 1.09 * 0.09 - Number(finalAccounts['1201']) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(finalAccounts['1001']) - Number(finalAccounts['1201'])) / 1.13 * 0.13 - Number(finalAccounts['130102']) / 1.09 * 0.09 - Number(finalAccounts['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(finalAccounts['1001']) * rateCompany).toFixed(2)) + Number((Number(finalAccounts['1001']) * 0.0003).toFixed(2)) + Number((Number(finalAccounts['1001']) * rateManagement).toFixed(2)))).toFixed(2)) / Number(finalAccounts['1001']) * 100).toFixed(2)}}%</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="userInfo.F_126 == 'True'">{{!Number(financialData['100101']) ? 0 : (((Number(financialData['100101']) - Number(financialData['1201']) - Number(financialData['1301']) - Number(financialData['1401']) - Number(Number(formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? ((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number(formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) > 0 ? (Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2) : 0) : 0) + Number((formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))) > 0 ? (formBudget.rate == 'A' ? ((Number(financialData['1001']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'B' ? ((Number(financialData['1001']) / 1.09 * 0.09 - Number(financialData['1201']) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : (formBudget.rate == 'C' ? (((Number(financialData['1001']) - Number(financialData['1201'])) / 1.13 * 0.13 - Number(financialData['130102']) / 1.09 * 0.09 - Number(financialData['130103']) / 1.03 * 0.03).toFixed(2)) * 0.1 : 0))).toFixed(2) : 0) + Number((Number(financialData['1001']) * rateCompany).toFixed(2)) + Number((Number(financialData['1001']) * 0.0003).toFixed(2)) + Number((Number(financialData['1001']) * rateManagement).toFixed(2)))).toFixed(2)) / Number(financialData['100101']) * 100).toFixed(2)}}%</span>
            <span v-else></span>
          </td>
          <td class="TextLeft">{{note['1801']}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </section>
</template>

<script>
export default {
  name: 'Print',
  props: ['userInfo', 'rateCompany', 'rateManagement', 'formBudget', 'budget', 'finalAccounts', 'financialData', 'note', 'timeStamp'],
  data () {
    return {
    }
  },
  created () {
    // this.doPrint()
  },
  methods: {
    doPrint () {
      var printBox = document.getElementById('printBox')
      // 拿到打印的区域的html内容
      var newContent = printBox.innerHTML
      // 将旧的页面储存起来，当打印完成后返给给页面。
      // var oldContent = document.body.innerHTML
      // 赋值给body
      // document.body.innerHTML = newContent
      // 执行window.print打印功能
      // window.print()
      // 重新加载页面，以刷新数据。以防打印完之后，页面不能操作的问题
      // window.location.reload()
      // document.body.innerHTML = oldContent
      // return false
      var styleText = '.TextLeft{text-align: left !important;padding-left:5px;} #topInfo td{border:0px;height: 35px;} thead{height: 35px;line-height: 35px;} #budget thead tr th{border-bottom: 1px solid #DCDFE6;border-right: 1px solid #DCDFE6;} #budget tbody tr td{text-align:center;font-size: 14px;height: 30px;line-height: 30px;border-bottom: 1px solid #DCDFE6;border-right: 1px solid #DCDFE6;}'
      var newWin = window.open('')
      newWin.document.head.innerHTML = '<style>' + styleText + '</style>'
      newWin.document.body.innerHTML = newContent
      newWin.document.close()
      newWin.focus()
      newWin.print()
      newWin.close()
      this.$emit('hidePrint')
    }
  }
}
</script>

<style scoped>
thead{
  height: 35px;
  line-height: 35px;
}
#topInfo tbody td{
  height: 35px;
}
#budget thead tr th{
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
#budget tbody tr td{
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #DCDFE6;
  border-right: 1px solid #DCDFE6;
}
</style>
