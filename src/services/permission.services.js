import { PrismaClient } from "@prisma/client";
import _ from "lodash";
const prisma = new PrismaClient();
export const permissionService = {
  create: async function (req) {
    return `This action create`;
  },

  findAll: async function (req) {
    return `This action returns all permission`;
  },

  findOne: async function (req) {
    return `This action returns a id: ${req.params.id} permission`;
  },

  update: async function (req) {
    return `This action updates a id: ${req.params.id} permission`;
  },

  remove: async function (req) {
    return `This action removes a id: ${req.params.id} permission`;
  },
  groupByModule: async function (req) {
    const { id } = req.params;
    // lấy ra tất cả permission từ bảng  "role_permission"
    const permission = await prisma.permissions.findMany({
      include: {
        role_permissions: {
          where: {
            role_id: +id,
            is_active: true,
          },
        },
      },
    });
    return _.groupBy(permission, "module");
  },
};
